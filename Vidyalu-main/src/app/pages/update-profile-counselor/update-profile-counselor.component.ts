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
  selector: 'app-update-profile-counselor',
  templateUrl: './update-profile-counselor.component.html',
  styleUrls: ['./update-profile-counselor.component.scss']
})
export class UpdateProfileCounselorComponent implements OnInit {
  user_data = JSON.parse(localStorage.getItem('user_data'));
  name = "";
  state_array = [];
  city_array = [];
  state = "";
  city = "";
  email = "";
  phone = "";
  zip_code = "";
  edu_qualification: any;
  search = "";
  tch_information = [];
  address = "";
  year_array = []
  uploded_msg = "";
  fileuploaded = false;
  pincode = "";
  profile_uploded_msg = "";
  id_uploded_msg = "";
  identification_text = "";
  identification_card = "";
  profile_img = "";
  image_path = environment.Api_Url;
  id_proof_img = "";
  certificate_img = "";
  description = "";
  edit_profile_form = new FormGroup({
    name: new FormControl("", Validators.required),
    phone: new FormControl("", Validators.required),
    email: new FormControl("", Validators.required),
    address: new FormControl("", Validators.required),
    state: new FormControl("", Validators.required),
    city: new FormControl("", Validators.required),
    pincode: new FormControl("", Validators.required),
    search: new FormControl("", Validators.required),
    service: new FormArray([]),
    award: new FormArray([]),
    certificate: new FormControl(""),
    identification_card: new FormControl(""),
    profile_img: new FormControl(""),
    description: new FormControl("", Validators.required),
    id_proof: new FormControl(""),
  });

  constructor(private spinner: NgxSpinnerService,
    private dialog: MatDialog,
    private service: ServiceService,
    private router: Router, private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {
    var prev_yr = 1990
    var cur_yr = new Date().getFullYear()
    for (let i = prev_yr; i <= cur_yr; i++) {
      this.year_array.push(i)
    }
  }

  ngOnInit(): void {
    this.spinner.show()
    if (this.user_data != null && this.user_data != undefined) {
      this.name = this.user_data.username;
      this.phone = this.user_data.phone;
      this.email = this.user_data.email;
      this.address = this.user_data.address;
      this.state = this.user_data.state;
      this.city = this.user_data.city;
      this.pincode = this.user_data.zip_code;
      var cls_array = []
      var tch_expr_array = []
      if (this.user_data.services.length > 0) {
        for (let i = 0; i < this.user_data.services.length; i++) {
          this.t.push(this.formBuilder.group({
            service: ['', Validators.required],
          }));
          cls_array.push({
            service: this.user_data.services[i].service
          })
        }
      }
      this.t.patchValue(cls_array)
      if (this.user_data.awards.length > 0) {
        for (let i = 0; i < this.user_data.awards.length; i++) {
          this.g.push(this.formBuilder.group({
            award: ['', Validators.required],
          }));
          tch_expr_array.push({
            award: this.user_data.awards[i].award,
          })
        }
      }
      this.g.patchValue(tch_expr_array)
      this.search = this.user_data.search;
      this.description = this.user_data.details;
      if (this.user_data.certificate != null && this.user_data.certificate != undefined && this.user_data.certificate != '') {
        this.certificate_img = this.image_path + this.user_data.certificate;
      }
      if (this.user_data.id_proof != null && this.user_data.id_proof != undefined && this.user_data.certificate != '') {
        this.id_proof_img = this.image_path + this.user_data.id_proof;
      }
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
      if (this.user_data.is_adharcard == true) {
        this.identification_card = "aadhar_card"
      }
      if (this.user_data.is_pancard == true) {
        this.identification_card = "pan_card"
      }
      if (this.user_data.is_passport == true) {
        this.identification_card = "passport"
      }
    }
    // this.spinner.show()
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

  get f() { return this.edit_profile_form.controls; }
  get t() { return this.f.service as FormArray; }
  get g() { return this.f.award as FormArray; }

  AddServiceDetails() {
    this.t.push(this.formBuilder.group({
      service: ['', Validators.required],
    }));
  }

  delete_service_details(numder) {
    this.t.removeAt(numder - 1);
  }

  AddAwardDetails() {
    this.g.push(this.formBuilder.group({
      award: ['', Validators.required],
    }));
  }

  delete_award_details(numder) {
    this.g.removeAt(numder - 1);
  }

  onFileChange(event) {
    this.uploded_msg = "";
    if (event.target.files.length > 0) {
      this.fileuploaded = true;
      this.edit_profile_form.patchValue({
        certificate: event.target.files[0]
      });
      this.uploded_msg = "File uploaded."
    }
  }

  ProfileUpload(event) {
    this.profile_uploded_msg = "";
    if (event.target.files.length > 0) {
      this.edit_profile_form.patchValue({
        profile_img: event.target.files[0]
      });
      this.profile_uploded_msg = "Profile uploaded."
    }
  }

  IdUpload(event) {
    this.id_uploded_msg = "";
    if (event.target.files.length > 0) {
      this.edit_profile_form.patchValue({
        id_proof: event.target.files[0]
      });
      this.id_uploded_msg = "Id uploaded."
    }
  }

  IdentificationText(param) {
    this.identification_text = param
  }

  EditCounsellorProfile() {
    const formData = new FormData();
    var is_adharcard = false;
    var is_pancard = false;
    var is_passport = false;
    if (this.edit_profile_form.valid) {
      this.spinner.show()
      if (this.edit_profile_form.value.identification_card == 'aadhar_card') {
        is_adharcard = true;
      } else if (this.edit_profile_form.value.identification_card == 'pan_card') {
        is_pancard = true;
      } else {
        is_passport = true;
      }
      formData.append('area_code', this.edit_profile_form.get('pincode').value);
      formData.append('address', this.edit_profile_form.get('address').value);
      formData.append('city', this.edit_profile_form.get('city').value);
      formData.append('state', this.edit_profile_form.get('state').value);
      formData.append('username', this.edit_profile_form.get('name').value);
      formData.append('phone', this.edit_profile_form.get('phone').value);
      formData.append('email', this.edit_profile_form.get('email').value);
      formData.append('services', JSON.stringify(this.edit_profile_form.get('service').value));
      formData.append('details', this.edit_profile_form.get('description').value);
      formData.append('awards', JSON.stringify(this.edit_profile_form.get('award').value));
      formData.append('is_adharcard', is_adharcard.toString());
      formData.append('is_pancard', is_pancard.toString());
      formData.append('is_passport', is_passport.toString());
      formData.append('certificate', this.edit_profile_form.get('certificate').value);
      formData.append('profile_image', this.edit_profile_form.get('profile_img').value);
      formData.append('id_proof', this.edit_profile_form.get('id_proof').value);
      formData.append('search', this.edit_profile_form.get('search').value);
      this.service.TokenOnPutMethod(formData, "/api/", "counsellor").subscribe(res => {
        if (res.status) {
          this.service.TokenOnGetMethod("/api/", "counsellor").subscribe(counsellor_res => {
            if (counsellor_res.status) {
              this.spinner.hide()
              localStorage.setItem("user_data", JSON.stringify(counsellor_res.data));
              this.service.SetHeader()
              this.router.navigate(['/counsellor/counsellor-profile'])
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
