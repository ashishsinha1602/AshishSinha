import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/dialog/dialog.component';
import { ServiceService } from '../service/service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { LocalStorageService, SessionStorageService, LocalStorage, SessionStorage } from 'angular-web-storage';

@Component({
  selector: 'app-course-details-admin',
  templateUrl: './course-details-admin.component.html',
  styleUrls: ['./course-details-admin.component.scss']
})
export class CourseDetailsAdminComponent implements OnInit {
  course_details_array = [];
  course_image_path = environment.Api_Url;
  course_data = "";
  course_id = "";
  constructor(private spinner: NgxSpinnerService,
    private dialog: MatDialog,
    private service: ServiceService,
    private router: Router,
    private session: SessionStorageService
  ) { }

  ngOnInit(): void {
    this.spinner.show()
    this.course_data = this.session.get('course_id')
    if (this.course_data == null || this.course_data == undefined) {
      this.router.navigate(['/student/courses-list'])
    } else {
      this.course_id = this.course_data
    }
    this.GetCourseDetails()
  }

  GetCourseDetails() {
    let param = {
      id: this.course_id
    }
    this.service.TokenOnPostMethod(param, "/api/student/course/", "details").subscribe(res => {
      console.log(res)
      if (res.status) {
        this.spinner.hide()
        this.course_details_array = res.data
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
