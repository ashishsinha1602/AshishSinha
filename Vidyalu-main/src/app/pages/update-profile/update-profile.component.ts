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
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.scss']
})
export class UpdateProfileComponent implements OnInit {
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
  competency_array = [
    "Critical thinking", "Patience", "Communication", "Organization",
    "Imaginative thinking", "Leadership", "Teamwork", "Time management",
    "Technological skills", "Conflict resolution"
  ];
  competency = [];
  dropdownSettings = {};
  address = "";
  year_array = [];
  uploded_msg = "";
  fileuploaded = false;
  selectedItems = [];
  identification_card = "";
  resume_uploded_msg = "";
  resume_fileuploaded = false;
  profile_uploded_msg = "";
  profile_fileuploaded = false;
  id_uploded_msg = "";
  id_fileuploaded = false;
  identification_text = "";
  description = "";
  pincode = "";
  certificate_img = "";
  profile_img = "";
  tch_resume_img = "";
  id_proof_img = "";
  image_path = environment.Api_Url;
  id_card = true;
  edit_profile_form = new FormGroup({
    name: new FormControl("", Validators.required),
    phone: new FormControl("", Validators.required),
    email: new FormControl("", Validators.required),
    address: new FormControl("", Validators.required),
    state: new FormControl("", Validators.required),
    city: new FormControl("", Validators.required),
    pincode: new FormControl("", Validators.required),
    school_details: new FormArray([]),
    tch_information: new FormArray([]),
    certificate: new FormControl(""),
    competency: new FormControl("", Validators.required),
    search: new FormControl("", Validators.required),
    identification_card: new FormControl(""),
    tch_resume: new FormControl(""),
    profile_img: new FormControl(""),
    description: new FormControl(""),
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
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 5,
      allowSearchFilter: true
    };

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
      if (this.user_data.edu_qualification.length > 0) {
        for (let i = 0; i < this.user_data.edu_qualification.length; i++) {
          this.t.push(this.formBuilder.group({
            school_name: ['', Validators.required],
            duration_from: ['', Validators.required],
            duration_to: ['', Validators.required],
          }));
          cls_array.push({
            school_name: this.user_data.edu_qualification[i].school_name,
            duration_from: this.user_data.edu_qualification[i].duration_from,
            duration_to: this.user_data.edu_qualification[i].duration_to
          })
        }
      }
      this.t.patchValue(cls_array)
      if (this.user_data.tch_information.length > 0) {
        for (let i = 0; i < this.user_data.tch_information.length; i++) {
          this.g.push(this.formBuilder.group({
            experience: ['', Validators.required],
            college_name: ['', Validators.required],
            duration_from: ['', Validators.required],
            duration_to: ['', Validators.required],
          }));
          tch_expr_array.push({
            experience: this.user_data.tch_information[i].experience,
            college_name: this.user_data.tch_information[i].college_name,
            duration_from: this.user_data.tch_information[i].duration_from,
            duration_to: this.user_data.tch_information[i].duration_to
          })
        }
      }
      this.g.patchValue(tch_expr_array)
      this.search = this.user_data.search;
      this.competency = this.user_data.competency_area;
      this.description = this.user_data.description;
      if (this.user_data.certificate != null && this.user_data.certificate != undefined && this.user_data.certificate != '') {
        this.certificate_img = this.image_path + this.user_data.certificate;
      }
      if (this.user_data.id_proof != null && this.user_data.id_proof != undefined && this.user_data.certificate != '') {
        this.id_proof_img = this.image_path + this.user_data.id_proof;
      }
      if (this.user_data.tch_resume != null && this.user_data.tch_resume != undefined && this.user_data.certificate != '') {
        this.tch_resume_img = this.image_path + this.user_data.tch_resume;
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

  get f() { return this.edit_profile_form.controls; }
  get t() { return this.f.school_details as FormArray; }
  get g() { return this.f.tch_information as FormArray; }

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

  onItemSelect(item: any) {
    // console.log(item);
    // if(this.competency.length >= 3) {
    //   this.max_value = true
    // } else {
    //   this.max_value = false
    // }
  }
  onSelectAll(items: any) {
    // console.log(items);
  }

  AddSchoolDetails() {
    this.t.push(this.formBuilder.group({
      school_name: ['', Validators.required],
      duration_from: ['', Validators.required],
      duration_to: ['', Validators.required],
    }));
  }

  delete_school_details(numder) {
    this.t.removeAt(numder - 1);
  }

  AddExperienceDetails() {
    this.g.push(this.formBuilder.group({
      experience: ['', Validators.required],
      college_name: ['', Validators.required],
      duration_from: ['', Validators.required],
      duration_to: ['', Validators.required],
    }));
  }

  delete_experience_details(numder) {
    this.t.removeAt(numder - 1);
  }

  ResumeUpload(event) {
    this.resume_uploded_msg = "";
    if (event.target.files.length > 0) {
      this.resume_fileuploaded = true;
      this.edit_profile_form.patchValue({
        tch_resume: event.target.files[0]
      });
      this.resume_uploded_msg = "Resume uploaded."
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

  IdUpload(event) {
    this.id_uploded_msg = "";
    if (event.target.files.length > 0) {
      this.id_fileuploaded = true;
      this.edit_profile_form.patchValue({
        id_proof: event.target.files[0]
      });
      this.id_uploded_msg = "Id uploaded."
    }
  }

  IdentificationText(param) {
    this.identification_text = param
  }

  Educational_Qualification(param, par) {
    if (this.edit_profile_form.value.school_details[par].duration_to != '' && this.edit_profile_form.value.school_details[par].duration_to != null) {
      if (this.edit_profile_form.value.school_details[par].duration_from > this.edit_profile_form.value.school_details[par].duration_to) {
        this.t.removeAt(par);
        this.t.push(this.formBuilder.group({
          school_name: ['', Validators.required],
          duration_from: ['', Validators.required],
          duration_to: ['', Validators.required],
        }));
      }
    }
  }

  Teaching_experience(param, par) {
    if (this.edit_profile_form.value.tch_information[par].duration_to != '' && this.edit_profile_form.value.tch_information[par].duration_to != null) {
      if (this.edit_profile_form.value.tch_information[par].duration_from > this.edit_profile_form.value.tch_information[par].duration_to) {
        this.g.removeAt(par);
        this.g.push(this.formBuilder.group({
          experience: ['', Validators.required],
          college_name: ['', Validators.required],
          duration_from: ['', Validators.required],
          duration_to: ['', Validators.required],
        }));
      }
    }
  }

  EditTeacherProfile() {
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
      formData.append('edu_qualification', JSON.stringify(this.edit_profile_form.get('school_details').value));
      formData.append('description', this.edit_profile_form.get('description').value);
      // formData.append('description', this.description);
      formData.append('tch_information', JSON.stringify(this.edit_profile_form.get('tch_information').value));
      formData.append('competency_area', JSON.stringify(this.edit_profile_form.get('competency').value));
      formData.append('is_adharcard', is_adharcard.toString());
      formData.append('is_pancard', is_pancard.toString());
      formData.append('is_passport', is_passport.toString());
      formData.append('certificate', this.edit_profile_form.get('certificate').value);
      formData.append('tch_resume', this.edit_profile_form.get('tch_resume').value);
      formData.append('profile_image', this.edit_profile_form.get('profile_img').value);
      formData.append('id_proof', this.edit_profile_form.get('id_proof').value);
      formData.append('search', this.edit_profile_form.get('search').value);
      this.service.TokenOnPutMethod(formData, "/api/", "teacher").subscribe(res => {
        if (res.status) {
          this.service.TokenOnGetMethod("/api/", "teacher").subscribe(teacher_res => {
            if (teacher_res.status) {
              this.spinner.hide()
              localStorage.setItem("user_data", JSON.stringify(teacher_res.data));
              this.service.SetHeader()
              this.router.navigate(['/teacher/teacher-profile'])
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
