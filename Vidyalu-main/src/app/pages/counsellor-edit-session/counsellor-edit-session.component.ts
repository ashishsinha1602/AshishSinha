import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/dialog/dialog.component';
import { ServiceService } from '../service/service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { LocalStorageService, SessionStorageService, LocalStorage, SessionStorage } from 'angular-web-storage';


@Component({
  selector: 'app-counsellor-edit-session',
  templateUrl: './counsellor-edit-session.component.html',
  styleUrls: ['./counsellor-edit-session.component.scss']
})
export class CounsellorEditSessionComponent implements OnInit {

  course_data = [];
  todayDate = new Date();
  language_array = ["English", "Hindi"];
  image_path = environment.Api_Url;
  session_content_file = environment.Api_Url;
  templete_array = [];
  video_msg = "";
  session_content_msg = "";
  is_course_content_uploaded = false;
  is_promo_video_uploaded = false;
  title = "";
  year_of_experience = "";
  language = "";
  price = "";
  total_day = "";
  total_hour = "";
  weekly_schedule = "";
  start_date = new Date();
  uploded_session_content = "";
  silent_feature = "";
  promo_video_file = "";
  session_id = "";
  session_form = new FormGroup({
    title: new FormControl("", Validators.required),
    year_of_experience: new FormControl("", Validators.required),
    language: new FormControl("", Validators.required),
    price: new FormControl("", Validators.required),
    total_day: new FormControl("", Validators.required),
    total_hour: new FormControl("", Validators.required),
    weekly_schedule: new FormControl("", Validators.required),
    start_date: new FormControl("", Validators.required),
    add_session: new FormArray([]),
    course_content: new FormControl(""),
    promo_video: new FormControl(""),
    silent_feature: new FormControl("", Validators.required),
  });

  constructor(private spinner: NgxSpinnerService,
    private dialog: MatDialog,
    private service: ServiceService,
    private router: Router, private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private session: SessionStorageService
  ) {

  }

  ngOnInit(): void {
    // this.todayDate.setHours(0,0,0,0)
    this.course_data = this.session.get('session')
    if (this.course_data == null || this.course_data == undefined) {
      this.router.navigate(['/teacher/course-list'])
    } else {
      this.title = this.course_data['title'];
      this.year_of_experience = this.course_data['year_of_experience'];
      this.language = this.course_data['language'];
      this.price = this.course_data['price'];
      this.total_day = this.course_data['total_days'];
      this.total_hour = this.course_data['total_hours'];
      this.weekly_schedule = this.course_data['weekly_schedule'];
      this.start_date = new Date(this.course_data['start_date']);
      this.session_id = this.course_data['id'];
      var cls_array = []
      if (this.course_data['dates_times'].length > 0) {
        for (let i = 0; i < this.course_data['dates_times'].length; i++) {
          this.t.push(this.formBuilder.group({
            session_date: ['', Validators.required],
            session_time: ['', Validators.required],
          }));
          cls_array.push({
            session_date: this.course_data['dates_times'][i].session_date,
            session_time: this.course_data['dates_times'][i].session_time,
          })
        }
      }
      this.t.patchValue(cls_array)
      this.uploded_session_content = this.session_content_file + this.course_data['contents'];
      this.promo_video_file = this.session_content_file + this.course_data['video'];
      this.silent_feature = this.course_data['salient'];
    }
  }

  get f() { return this.session_form.controls; }
  get t() { return this.f.add_session as FormArray; }

  AddSessionTiming() {
    this.t.push(this.formBuilder.group({
      session_date: ['', Validators.required],
      session_time: ['', Validators.required],
    }));
  }

  Download_template() {
    this.templete_array.push({
      "S No.": "",
      "Chapter Name": "",
      "Discription": "",
    })
    this.service.download_data(this.templete_array, "course_template")
  }

  Upload_Session_Content(event) {
    this.session_content_msg = "";
    if (event.target.files.length > 0) {
      this.is_course_content_uploaded = true
      this.session_form.patchValue({
        course_content: event.target.files[0]
      });
      this.session_content_msg = "Session content uploaded."
    }
  }

  Upload_Promo_Video(event) {
    this.video_msg = "";
    if (event.target.files.length > 0) {
      this.is_promo_video_uploaded = true
      this.session_form.patchValue({
        promo_video: event.target.files[0]
      });
      this.video_msg = "Video uploaded."
    }
  }

  delete_session(numder) {
    this.t.removeAt(numder - 1);
  }

  SubmitSession() {
    const formData = new FormData();
    if (this.session_form.valid) {
      // if (this.is_course_content_uploaded && this.is_promo_video_uploaded) {
      this.spinner.show()
      formData.append('id', this.session_id);
      formData.append('title', this.session_form.get('title').value);
      formData.append('year_of_experience ', this.session_form.get('year_of_experience').value);
      formData.append('language', this.session_form.get('language').value);
      formData.append('price', this.session_form.get('price').value);
      formData.append('contents', this.session_form.get('course_content').value);
      formData.append('total_days', this.session_form.get('total_day').value);
      formData.append('total_hours', this.session_form.get('total_hour').value);
      formData.append('weekly_schedule', this.session_form.get('weekly_schedule').value);
      formData.append('start_date', this.session_form.get('start_date').value);
      formData.append('dates_times', JSON.stringify(this.session_form.get('add_session').value));
      formData.append('video', this.session_form.get('promo_video').value);
      formData.append('salient', this.session_form.get('silent_feature').value);
      this.service.TokenOnPutMethod(formData, "/api/counsellor/session/", "edit").subscribe(res => {
        this.spinner.hide()
        if (res.status) {
          this.session.remove('session')
          this.router.navigate(['/counsellor/session-list'])
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
      // }
    }
  }

}
