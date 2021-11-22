import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/dialog/dialog.component';
import { ServiceService } from '../service/service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { LocalStorageService, SessionStorageService, LocalStorage, SessionStorage } from 'angular-web-storage';


@Component({
  selector: 'app-student-session-list',
  templateUrl: './student-session-list.component.html',
  styleUrls: ['./student-session-list.component.scss']
})
export class StudentSessionListComponent implements OnInit {

  session_array = [];
  session_image_path = environment.Api_Url;
  p: number = 1;

  constructor(private spinner: NgxSpinnerService,
    private dialog: MatDialog,
    private service: ServiceService,
    private router: Router,
    private session: SessionStorageService
  ) { }

  ngOnInit(): void {
    this.spinner.show()
    this.GetAllPublishSessionList()
  }

  GetAllPublishSessionList() {
    this.service.TokenOnGetMethod("/api/student/", "sessionall").subscribe(res => {
      if (res.status) {
        this.spinner.hide()
        this.session_array = res.data
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

  NavigateIntoSessionDetails(row) {
    this.session.set('session_id', row.id);
    this.router.navigate(['/student/session-details'])
  }

}
1