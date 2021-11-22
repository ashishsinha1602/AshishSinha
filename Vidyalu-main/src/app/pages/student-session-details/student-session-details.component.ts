import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/dialog/dialog.component';
import { ServiceService } from '../service/service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { LocalStorageService, SessionStorageService, LocalStorage, SessionStorage } from 'angular-web-storage';


@Component({
  selector: 'app-student-session-details',
  templateUrl: './student-session-details.component.html',
  styleUrls: ['./student-session-details.component.scss']
})
export class StudentSessionDetailsComponent implements OnInit {
  session_details_array = [];
  session_image_path = environment.Api_Url;
  session_data = "";
  session_id = "";

  constructor(private spinner: NgxSpinnerService,
    private dialog: MatDialog,
    private service: ServiceService,
    private router: Router,
    private session: SessionStorageService
  ) { }

  ngOnInit(): void {
    this.spinner.show()
    this.session_data = this.session.get('session_id')
    if (this.session_data == null || this.session_data == undefined) {
      this.router.navigate(['/student/courses-list'])
    } else {
      this.session_id = this.session_data
    }
    this.GetSessionDetails()
  }

  GetSessionDetails() {
    let param = {
      id: this.session_id
    }
    this.service.TokenOnPostMethod(param, "/api/student/session/", "details").subscribe(res => {
      console.log(res)
      if (res.status) {
        this.spinner.hide()
        this.session_details_array = res.data
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

}
