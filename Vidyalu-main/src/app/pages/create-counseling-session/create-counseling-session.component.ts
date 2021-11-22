import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/dialog/dialog.component';
import { ServiceService } from '../service/service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-create-counseling-session',
  templateUrl: './create-counseling-session.component.html',
  styleUrls: ['./create-counseling-session.component.scss']
})
export class CreateCounselingSessionComponent implements OnInit {

  // dt = new Date(); dt.setDate(dt)
  // todayDate = new Date(); 
  // todayDate.setDate(todayDate.getDate() + 1)
  todayDate = new Date();
  language_array = ["English", "Hindi"];
  image_path = environment.Api_Url;
  course_content_file = environment.Api_Url + '/media/documents/Linorel_Feedback.docx';
  templete_array = [];
  video_msg = "";
  session_content_msg = "";
  is_session_content_uploaded = false;
  is_promo_video_uploaded = false;

  constructor(private spinner: NgxSpinnerService,
    private dialog: MatDialog,
    private service: ServiceService,
    private router: Router, private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {
  }

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
    session_content: new FormControl("", Validators.required),
    promo_video: new FormControl("", Validators.required),
    silent_feature: new FormControl("", Validators.required),
  });

  ngOnInit(): void {
    this.todayDate.setHours(0,0,0,0)
    // this.todayDate.setDate(this.todayDate.getDate() - 1)
    this.t.push(this.formBuilder.group({
      session_date: ['', Validators.required],
      session_time: ['', Validators.required],
    }));
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
    this.service.download_data(this.templete_array, "session_template")
  }

  Upload_Session_Content(event) {
    this.session_content_msg = "";
    if (event.target.files.length > 0) {
      this.is_session_content_uploaded = true
      this.session_form.patchValue({
        session_content: event.target.files[0]
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
      if (this.is_session_content_uploaded && this.is_promo_video_uploaded) {
        this.spinner.show()
        formData.append('title', this.session_form.get('title').value);
        formData.append('year_of_experience', this.session_form.get('year_of_experience').value);
        formData.append('language', this.session_form.get('language').value);
        formData.append('price', this.session_form.get('price').value);
        formData.append('contents', this.session_form.get('session_content').value);
        formData.append('total_days', this.session_form.get('total_day').value);
        formData.append('total_hours', this.session_form.get('total_hour').value);
        formData.append('weekly_schedule', this.session_form.get('weekly_schedule').value);
        formData.append('start_date', this.session_form.get('start_date').value);
        formData.append('dates_times', JSON.stringify(this.session_form.get('add_session').value));
        formData.append('video', this.session_form.get('promo_video').value);
        formData.append('salient', this.session_form.get('silent_feature').value);
        this.service.TokenOnPostMethod(formData, "/api/counsellor/", "session").subscribe(res => {
          this.spinner.hide()
          if (res.status) {
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
      }
    }
  }
}
