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
  selector: 'app-teacher-list',
  templateUrl: './teacher-list.component.html',
  styleUrls: ['./teacher-list.component.scss']
})
export class TeacherListComponent implements OnInit {
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: any;
  dtTrigger: Subject<any> = new Subject();
  image_path = environment.Api_Url;
  result = "";

  constructor(private spinner: NgxSpinnerService,
    private dialog: MatDialog,
    private service: AdminserviceService,
    private router: Router, private activatedRoute: ActivatedRoute,
  ) { }

  // dtOptions: DataTables.Settings = {};
  teacher_array = [];
  teacher_details = [];

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
    this.GetTeacherList("0")
  }

  GetTeacherList(param) {
    this.service.TokenOnGetMethod("/api/admin/", "teacher").subscribe(res => {
      if (res.status) {
        this.spinner.hide()
        this.teacher_array = res.data
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

  Teacher_Details(row) {
    this.teacher_details = [];
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
    if (row.certificate != '' && row.certificate != null) {
      row.certificate_img = this.image_path + row.certificate
    }
    if (row.id_proof != '' && row.id_proof != null) {
      row.id_proof_img = this.image_path + row.id_proof
    }
    if (row.tch_resume != '' && row.tch_resume != null) {
      row.tch_resume_img = this.image_path + row.tch_resume
    }
    this.teacher_details.push(row)
  }

  Teacher_Block_Status(row, status) {
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
        this.service.TokenOnPutMethod(param, "/api/admin/block/", "teacher/" + row.teacher).subscribe(res => {
          if (res.status) {
            this.GetTeacherList("1")
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
