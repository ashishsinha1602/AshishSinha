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
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit {
  user_data = JSON.parse(localStorage.getItem('user_data'));
  name = "";
  state_array = [];
  city_array = [];
  state = "";
  city = "";
  email = "";
  counsellor_array = [];
  image_path = environment.Api_Url
  record_error_msg = "";
  profession = "Counsellor";
  p: number = 1;
  teacher_details = [];

  search_form = new FormGroup({
    state: new FormControl(""),
    city: new FormControl(""),
    pincode: new FormControl(""),
    role: new FormControl("", Validators.required),
  });

  constructor(private spinner: NgxSpinnerService,
    private dialog: MatDialog,
    private service: ServiceService,
    private router: Router, private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private session: SessionStorageService
  ) { }

  ngOnInit(): void {
    this.spinner.show()
    if(this.user_data != '' && this.user_data != null) {
      this.name = this.user_data.username;
      this.email = this.user_data.email;
    }
    // this.GetCounsellorList()
    this.GetStateCity()
  }

  // GetCounsellorList() {
  //   this.service.TokenOnGetMethod("/api/student/", "counsellor").subscribe(res => {
  //     if (res.status) {
  //       this.counsellor_array = res.data;
  //       if (this.counsellor_array.length == 0) {
  //         this.record_error_msg = "Record not found."
  //       }
  //       this.GetStateCity()
  //     }
  //   },
  //     err => {
  //       console.log(err);
  //       this.spinner.hide()
  //       this.dialog.open(DialogComponent, {
  //         width: '270px',
  //         data: { title: "", content: err.error.message }
  //       })
  //     }
  //   );
  // }

  GetStateCity() {
    this.service.OnGetMethod("/api/", "location").subscribe(res => {
      this.spinner.hide()
      if (res.status) {
        this.state_array = res.data
      }
    },
      err => {
        console.log(err);
        this.spinner.hide()
        this.dialog.open(DialogComponent, {
          width: '270px',
          data: { title: "", content: err.error.message }
        })
      });
  }

  BasedOntheState(param) {
    this.city_array = [];
    var city_data = this.state_array.find(element => element.state == param)
    if (city_data.city_array.length > 0) {
      for (let i = 0; i < city_data.city_array.length; i++) {
        this.city_array.push(city_data.city_array[i])
      }
    }
  }

  SearchFunction() {
    this.record_error_msg = "";
    if (this.search_form.valid) {
      this.spinner.show()
      let param = {
        city: this.search_form.value.city,
        search: this.search_form.value.pincode,
        role: this.search_form.value.role,
        state: this.search_form.value.state
      }
      this.service.OnPostMethod(param, "/api/search/", "list").subscribe(res => {
        this.spinner.hide()
        if (res.status) {
          this.counsellor_array = res.data;
          if (this.counsellor_array.length == 0) {
            this.record_error_msg = "Record not found."
          }
          if (this.search_form.value.role == 'teacher') {
            this.profession = 'Teacher'
          } else {
            this.profession = 'Counsellor'
          }
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

  Teacher_Details(row) {
    console.log(row)
    this.teacher_details = [];
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
    // if (row.id_proof != '' && row.id_proof != null) {
    //   row.id_proof_img = this.image_path + row.id_proof
    // }
    // if (row.tch_resume != '' && row.tch_resume != null) {
    //   row.tch_resume_img = this.image_path + row.tch_resume
    // }
    this.teacher_details.push(row)
  }

  GetCourseBasedOnTeacher(row) {
    this.session.set('teacher_id', row.teacher);
    this.router.navigate(['/teacher-course-list'])
  }

  Counsellor_Details(row) {
    
  }

  GetSessionBasedOnCounsellor(row) {
    console.log(row)
    
  }
}
