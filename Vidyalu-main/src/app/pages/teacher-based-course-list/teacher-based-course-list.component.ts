import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/dialog/dialog.component';
import { ServiceService } from '../service/service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { LocalStorageService, SessionStorageService, LocalStorage, SessionStorage } from 'angular-web-storage';


@Component({
  selector: 'app-teacher-based-course-list',
  templateUrl: './teacher-based-course-list.component.html',
  styleUrls: ['./teacher-based-course-list.component.scss']
})
export class TeacherBasedCourseListComponent implements OnInit {

  course_array = [];
  course_image_path = environment.Api_Url;
  p: number = 1;
  teacher_data = "";
  teacher_id = "";

  constructor(private spinner: NgxSpinnerService,
    private dialog: MatDialog,
    private service: ServiceService,
    private router: Router,
    private session: SessionStorageService
  ) { }


  ngOnInit(): void {
    this.spinner.show()
    this.teacher_data = this.session.get('teacher_id')
    if (this.teacher_data == null || this.teacher_data == undefined) {
      this.router.navigate(['/counsellor-search-list'])
    } else {
      this.teacher_id = this.teacher_data
    }
    console.log(this.teacher_id)
    this.GetAllPublishTeacherCourseList()
  }

  GetAllPublishTeacherCourseList() {
    let param = {
      id : this.teacher_id
    }
    this.service.TokenOnPostMethod(param, "/api/search/teacher/", "course").subscribe(res => {
      console.log(res)
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
