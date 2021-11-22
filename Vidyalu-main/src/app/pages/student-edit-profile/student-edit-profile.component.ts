import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/dialog/dialog.component';
import { ServiceService } from '../service/service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { state } from '@angular/animations';
import { environment } from '../../../environments/environment';


@Component({
  selector: 'app-student-edit-profile',
  templateUrl: './student-edit-profile.component.html',
  styleUrls: ['./student-edit-profile.component.scss']
})
export class StudentEditProfileComponent implements OnInit {
  user_data = JSON.parse(localStorage.getItem('user_data'));
  name = "";
  state_array = [];
  city_array = [];
  state = "";
  city = "";
  email = "";
  phone = "";
  zip_code = "";
  address = "";
  image_path = environment.Api_Url;
  pincode = "";
  profile_img = "";
  profile_uploded_msg = "";
  profile_fileuploaded = false;

  edit_profile_form = new FormGroup({
    name: new FormControl("", Validators.required),
    phone: new FormControl("", Validators.required),
    email: new FormControl("", Validators.required),
    address: new FormControl("", Validators.required),
    state: new FormControl("", Validators.required),
    city: new FormControl("", Validators.required),
    pincode: new FormControl("", Validators.required),
    profile_img: new FormControl(""),
  });

  constructor(private spinner: NgxSpinnerService,
    private dialog: MatDialog,
    private service: ServiceService,
    private router: Router, private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {
    
  }

  ngOnInit(): void {
    this.spinner.show()
    console.log(this.user_data)
    if (this.user_data != null && this.user_data != undefined) {
      this.name = this.user_data.username;
      this.phone = this.user_data.phone;
      this.email = this.user_data.email;
      this.address = this.user_data.address;
      this.state = this.user_data.state;
      this.city = this.user_data.city;
      this.pincode = this.user_data.zip_code;
      if ((this.user_data.profile_img == '' || this.user_data.profile_img == null)
        && (this.user_data.photo_url == '' || this.user_data.photo_url == null)) {
        this.profile_img = "assets/images/avatar.jpg"
      } else {
        if ((this.user_data.profile_img == '' || this.user_data.profile_img == null)
          && (this.user_data.photo_url != '' || this.user_data.photo_url != null)) {
          this.profile_img = this.user_data.photo_url
        } else {
          this.profile_img = this.image_path + this.user_data.profile_img
        }
      }
    }
    this.GetStateCity()
  }

  GetStateCity() {
    this.city_array = [];
    this.service.OnGetMethod("/api/", "location").subscribe(res => {
      this.spinner.hide()
      if (res.status) {
        this.state_array = res.data
        var city_data = this.state_array.find(element => element.state == this.state)
        if (city_data.city_array.length > 0) {
          for (let i = 0; i < city_data.city_array.length; i++) {
            this.city_array.push(city_data.city_array[i])
          }
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

  ProfileUpload(event) {
    this.profile_uploded_msg = "";
    if (event.target.files.length > 0) {
      this.profile_fileuploaded = true;
      this.edit_profile_form.patchValue({
        profile_img: event.target.files[0]
      });
      this.profile_uploded_msg = "Profile uploaded."
    }
  }

  EditStudentProfile() {
    const formData = new FormData();
    if (this.edit_profile_form.valid) {
      this.spinner.show()
      formData.append('area_code', this.edit_profile_form.get('pincode').value);
      formData.append('address', this.edit_profile_form.get('address').value);
      formData.append('city', this.edit_profile_form.get('city').value);
      formData.append('state', this.edit_profile_form.get('state').value);
      formData.append('username', this.edit_profile_form.get('name').value);
      formData.append('phone', this.edit_profile_form.get('phone').value);
      formData.append('email', this.edit_profile_form.get('email').value);
       formData.append('profile_image', this.edit_profile_form.get('profile_img').value);
      this.service.TokenOnPutMethod(formData, "/api/", "student").subscribe(res => {
        if (res.status) {
          this.service.TokenOnGetMethod("/api/", "student").subscribe(teacher_res => {
            if (teacher_res.status) {
              this.spinner.hide()
              localStorage.setItem("user_data", JSON.stringify(teacher_res.data));
              this.service.SetHeader()
              this.router.navigate(['/student/student-profile'])
            }
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
  }

}
