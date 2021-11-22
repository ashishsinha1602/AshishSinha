import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/dialog/dialog.component';
import { ServiceService } from '../service/service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { environment } from '../../../environments/environment';
import { ConfirmDialogComponent, ConfirmDialogModel } from 'src/app/confirm-dialog/confirm-dialog.component';
import { LocalStorageService, SessionStorageService, LocalStorage, SessionStorage } from 'angular-web-storage';
@Component({
  selector: 'app-teacher-course-list',
  templateUrl: './teacher-course-list.component.html',
  styleUrls: ['./teacher-course-list.component.scss']
})
export class TeacherCourseListComponent implements OnInit {
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: any;
  dtTrigger: Subject<any> = new Subject();
  image_path = environment.Api_Url;
  result = "";
  course_array = [];

  constructor(private spinner: NgxSpinnerService,
    private dialog: MatDialog,
    private service: ServiceService,
    private router: Router, private activatedRoute: ActivatedRoute,
    private session: SessionStorageService
  ) { }

  ngOnInit(): void {
    this.spinner.show()
    this.dtOptions = {
      dom: 'Bfrtip',
      buttons: [
        {
          extend: 'copyHtml5',
          exportOptions: {
            columns: ':not(:last-child)',
          }
        },
        {
          extend: 'csvHtml5',
          filename: function () {
            return "csv";
          },
          // columns: [0, ':visible']
          exportOptions: {
            columns: ':not(:last-child)',
          }
        },
        {
          extend: 'excelHtml5',
          exportOptions: {
            columns: ':not(:last-child)'
          }
        },
      ],
      pagingType: 'full_numbers',
    };
    this.GetCourseList('0')
  }

  GetCourseList(param) {
    this.service.TokenOnGetMethod("/api/teacher/", "courseall").subscribe(res => {
      if (res.status) {
        this.spinner.hide()
        this.course_array = res.data
        if (param == '0') {
          this.dtTrigger.next();
        }
        this.rerender();
      }
    },
      err => {
        console.log(err);
        this.spinner.hide()
        this.dialog.open(DialogComponent, {
          width: '270px',
          data: { title: "", content: err.error.message }
        })
      }
    );
  }

  Edit_Course(param) {
    this.session.set('course', param);
    this.router.navigate(['/teacher/edit-course'])
  }

  Course_Publish(row) {
    const message = `Are you sure you want to do this?`;
    const dialogData = new ConfirmDialogModel("Please Confirm...", message);
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: dialogData
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      this.result = dialogResult;
      if (this.result) {
        this.spinner.show()
        let param = {
          id: row.id,
          publish: row.publish
        }
        this.service.TokenOnPutMethod(param, "/api/teacher/course/", "publish").subscribe(res => {
          if (res.status) {
            this.GetCourseList('1')
          }
        },
          err => {
            console.log(err);
            this.spinner.hide()
            this.dialog.open(DialogComponent, {
              width: '270px',
              data: { title: "", content: err.error.message }
            })
          }
        );
      }
    });
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
    });
  }

}
