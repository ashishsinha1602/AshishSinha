import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/dialog/dialog.component';
import { ServiceService } from '../service/service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-teacher-create-course',
  templateUrl: './teacher-create-course.component.html',
  styleUrls: ['./teacher-create-course.component.scss']
})
export class TeacherCreateCourseComponent implements OnInit {
  todayDate = new Date();
  language_array = ["English", "Hindi"];
  image_path = environment.Api_Url;
  course_content_file = environment.Api_Url + '/media/documents/Linorel_Feedback.docx';
  templete_array = [];
  video_msg = "";
  course_content_msg = "";
  is_course_content_uploaded = false;
  is_promo_video_uploaded = false;

  constructor(private spinner: NgxSpinnerService,
    private dialog: MatDialog,
    private service: ServiceService,
    private router: Router, private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {}

  course_form = new FormGroup({
    title: new FormControl("", Validators.required),
    year_of_experience: new FormControl("", Validators.required),
    language: new FormControl("", Validators.required),
    price: new FormControl("", Validators.required),
    total_day: new FormControl("", Validators.required),
    total_hour: new FormControl("", Validators.required),
    weekly_schedule: new FormControl("", Validators.required),
    start_date: new FormControl("", Validators.required),
    add_class: new FormArray([]),
    course_content: new FormControl("", Validators.required),
    promo_video: new FormControl("", Validators.required),
    silent_feature: new FormControl("", Validators.required),
  });

  ngOnInit(): void {
    this.todayDate.setHours(0,0,0,0)
    this.t.push(this.formBuilder.group({
      class_date: ['', Validators.required],
      class_time: ['', Validators.required],
    }));
  }

  get f() { return this.course_form.controls; }
  get t() { return this.f.add_class as FormArray; }

  AddClassTiming() {
    this.t.push(this.formBuilder.group({
      class_date: ['', Validators.required],
      class_time: ['', Validators.required],
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

  Upload_Course_Content(event) {
    this.course_content_msg = "";
    if (event.target.files.length > 0) {
      this.is_course_content_uploaded = true
      this.course_form.patchValue({
        course_content: event.target.files[0]
      });
      this.course_content_msg = "Course content uploaded."
    }
  }

  Upload_Promo_Video(event) {
    this.video_msg = "";
    if (event.target.files.length > 0) {
      this.is_promo_video_uploaded = true
      this.course_form.patchValue({
        promo_video: event.target.files[0]
      });
      this.video_msg = "Video uploaded."
    }
  }

  delete_class(numder) {
    this.t.removeAt(numder - 1);
  }

  SubmitCourse() {
    const formData = new FormData();
    if (this.course_form.valid) {
      if (this.is_course_content_uploaded && this.is_promo_video_uploaded) {
        this.spinner.show()
        formData.append('title', this.course_form.get('title').value);
        formData.append('year_of_experience ', this.course_form.get('year_of_experience').value);
        formData.append('language', this.course_form.get('language').value);
        formData.append('price', this.course_form.get('price').value);
        formData.append('contents', this.course_form.get('course_content').value);
        formData.append('total_days', this.course_form.get('total_day').value);
        formData.append('total_hours', this.course_form.get('total_hour').value);
        formData.append('weekly_schedule', this.course_form.get('weekly_schedule').value);
        formData.append('start_date', this.course_form.get('start_date').value);
        formData.append('dates_times', JSON.stringify(this.course_form.get('add_class').value));
        formData.append('video', this.course_form.get('promo_video').value);
        formData.append('salient', this.course_form.get('silent_feature').value);
        this.service.TokenOnPostMethod(formData, "/api/teacher/", "course").subscribe(res => {
          this.spinner.hide()
          if (res.status) {
            this.router.navigate(['/teacher/course-list'])
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
