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
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-competency-area',
  templateUrl: './competency-area.component.html',
  styleUrls: ['./competency-area.component.scss']
})
export class CompetencyAreaComponent implements OnInit {
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: any;
  dtTrigger: Subject<any> = new Subject();
  ROOT_URL = environment.Api_Url;
  result = "";

  competency_form = new FormGroup({
    competency: new FormControl("", Validators.required),
  })

  constructor(private spinner: NgxSpinnerService,
    private dialog: MatDialog,
    private service: AdminserviceService,
    private router: Router, private activatedRoute: ActivatedRoute,
  ) { }

  // dtOptions: DataTables.Settings = {};
  competency_array = [];
  competency_details = [];

  ngOnInit(): void {
    // this.spinner.show()
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
    this.GetCompetencyList("0")
  }

  GetCompetencyList(param) {
    // this.service.TokenOnGetMethod("/api/admin/", "teacher").subscribe(res => {
    //   if (res.status) {
    //     console.log(res)
    //     this.spinner.hide()
    //     this.competency_array = res.data
    //     if (param == '0') {
    //       this.dtTrigger.next();
    //     }
    //     this.rerender();
    //   }
    // },
    //   err => {
    //     console.log(err);
    //     this.spinner.hide()
    //     this.dialog.open(DialogComponent, {
    //       width: '270px',
    //       data: { title: "", content: err.error.message }
    //     })
    //   }
    // );
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
    });
  }

  SaveCompetency() {
    console.log(this.competency_form)
    let param = {
      competency : this.competency_form.value.competency
    }
  }

  Competency_Details(row) {
    this.competency_details = [];
    this.competency_details.push(row)
  }

  Competency_Status(row, status) {
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
            this.GetCompetencyList("1")
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
