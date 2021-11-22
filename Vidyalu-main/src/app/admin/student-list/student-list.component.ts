import { Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/dialog/dialog.component';
import { AdminserviceService } from '../admin-service/adminservice.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { environment } from '../../../environments/environment';
import { ConfirmDialogComponent, ConfirmDialogModel } from 'src/app/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})
export class StudentListComponent implements OnInit {
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: any;
  dtTrigger: Subject<any> = new Subject();
  image_path = environment.Api_Url;
  result = "";
  student_array = [];
  student_details = [];
  constructor(private spinner: NgxSpinnerService,
    private dialog: MatDialog,
    private service: AdminserviceService,
    private router: Router, private activatedRoute: ActivatedRoute,
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
    this.GetStudentList('0')
  }

  GetStudentList(param) {
    this.service.TokenOnGetMethod("/api/admin/", "student").subscribe(res => {
      if (res.status) {
        // console.log(res)
        this.spinner.hide()
        this.student_array = res.data
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

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
    });
  }

  Student_Details(row) {
    this.student_details = [];
    if ((row.profile_img == '' || row.profile_img == null)
      && (row.photo_url == '' || row.photo_url == null)) {
      row.profile_image = "assets/images/avatar.jpg"
    } else {
      if ((row.profile_img == '' || row.profile_img == null)
        && (row.photo_url != '' || row.photo_url != null)) {
        row.profile_image = row.photo_url
      } else {
        row.profile_image = this.image_path + row.profile_img
      }
    }
    this.student_details.push(row)
  }

  Student_Block_Status(row, status) {
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
          block_by_admin: status
        }
        this.service.TokenOnPutMethod(param, "/api/admin/block/", "student/" + row.student).subscribe(res => {
          if (res.status) {
            this.GetStudentList("1")
            this.dialog.open(DialogComponent, {
              width: '270px',
              data: { title: "", content: res.message }
            })
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

}
