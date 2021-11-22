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
  selector: 'app-admin-session-list',
  templateUrl: './admin-session-list.component.html',
  styleUrls: ['./admin-session-list.component.scss']
})
export class AdminSessionListComponent implements OnInit {
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: any;
  dtTrigger: Subject<any> = new Subject();
  image_path = environment.Api_Url;
  result = "";
  counsellor_details = [];

  constructor(private spinner: NgxSpinnerService,
    private dialog: MatDialog,
    private service: AdminserviceService,
    private router: Router
  ) { }

  session_array = [];
  session_details = [];

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
    this.GetSessionList("0")
  }

  GetSessionList(param) {
    this.service.TokenOnGetMethod("/api/admin/counsellor/", "sessionall").subscribe(res => {
      console.log(res)
      if (res.status) {
        this.spinner.hide()
        this.session_array = res.data
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

  Session_Details(row) {
    this.session_details = [];
    if ((row.video != '' || row.video != null)) {
      row.session_video = this.image_path + row.video
    }
    if (row.contents != '' && row.contents != null) {
      row.session_contents = this.image_path + row.contents
    }
    this.session_details.push(row)
  }

  Counsellor_Details(row) {
    this.counsellor_details = [];
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
    this.counsellor_details.push(row)
  }

  Session_Block_Status(row, status) {
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
          block_by_admin: status
        }
        this.service.TokenOnPutMethod(param, "/api/admin/block/", "session").subscribe(res => {
          if (res.status) {
            this.GetSessionList("1")
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
