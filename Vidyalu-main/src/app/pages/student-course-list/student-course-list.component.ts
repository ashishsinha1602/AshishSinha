import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/dialog/dialog.component';
import { ServiceService } from '../service/service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { LocalStorageService, SessionStorageService, LocalStorage, SessionStorage } from 'angular-web-storage';


@Component({
  selector: 'app-student-course-list',
  templateUrl: './student-course-list.component.html',
  styleUrls: ['./student-course-list.component.scss']
})
export class StudentCourseListComponent implements OnInit {
  course_array = [];
  course_image_path = environment.Api_Url;
  p: number = 1;
  
  constructor(private spinner: NgxSpinnerService,
    private dialog: MatDialog,
    private service: ServiceService,
    private router: Router,
    private session: SessionStorageService
  ) { }


  ngOnInit(): void {
    this.spinner.show()
    this.GetAllPublishCourseList()
  }

  GetAllPublishCourseList() {
    this.service.TokenOnGetMethod("/api/student/", "courseall").subscribe(res => {
      if (res.status) {
        this.spinner.hide()
        this.course_array = res.data
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

  NavigateIntoCourseDetails(row) {
    this.session.set('course_id', row.id);
    this.router.navigate(['/course-details'])
  }
}
