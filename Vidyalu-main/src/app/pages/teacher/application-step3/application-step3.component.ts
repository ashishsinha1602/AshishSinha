import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/dialog/dialog.component';
import { ServiceService } from '../../service/service.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-application-step3',
  templateUrl: './application-step3.component.html',
  styleUrls: ['./application-step3.component.scss']
})
export class ApplicationStep3Component implements OnInit {
  user_data = JSON.parse(localStorage.getItem('user_data'));
  resume_uploded_msg = "";
  resume_fileuploaded = false;
  profile_uploded_msg = "";
  profile_fileuploaded = false;
  id_uploded_msg = "";
  id_fileuploaded = false;
  max_value = false;
  competency_array = [
    "Critical thinking", "Patience", "Communication", "Organization",
    "Imaginative thinking", "Leadership", "Teamwork", "Time management",
    "Technological skills", "Conflict resolution"
  ];
  year_array = []
  competency = [];
  dropdownSettings = {};
  identification_text = "";

  step3_form = new FormGroup({
    edu_details: new FormArray([]),
    identification_card: new FormControl("", Validators.required),
    competency: new FormControl("", Validators.required),
    tch_information: new FormControl("", Validators.required),
    profile_image: new FormControl("", Validators.required),
    id_proof: new FormControl("", Validators.required),
    search: new FormControl("", Validators.required),
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
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };

    this.t.push(this.formBuilder.group({
      experience: ['', Validators.required],
      college_name: ['', Validators.required],
      duration_from: ['', Validators.required],
      duration_to: ['', Validators.required],
    }));
  }

  get f() { return this.step3_form.controls; }
  get t() { return this.f.edu_details as FormArray; }

  AddExperienceDetails() {
    this.t.push(this.formBuilder.group({
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
      this.step3_form.patchValue({
        tch_information: event.target.files[0]
      });
      this.resume_uploded_msg = "Resume uploaded."
    }
  }

  ProfileUpload(event) {
    this.profile_uploded_msg = "";
    if (event.target.files.length > 0) {
      this.profile_fileuploaded = true;
      this.step3_form.patchValue({
        profile_image: event.target.files[0]
      });
      this.profile_uploded_msg = "Profile uploaded."
    }
  }

  IdUpload(event) {
    this.id_uploded_msg = "";
    if (event.target.files.length > 0) {
      this.id_fileuploaded = true;
      this.step3_form.patchValue({
        id_proof: event.target.files[0]
      });
      this.id_uploded_msg = "Id uploaded."
    }
  }

  IdentificationText(param) {
    this.identification_text = param
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

  Educational_Qualification(param, par) {
    if (this.step3_form.value.edu_details[par].duration_to != '' && this.step3_form.value.edu_details[par].duration_to != null) {
      if (this.step3_form.value.edu_details[par].duration_from > this.step3_form.value.edu_details[par].duration_to) {
        this.t.removeAt(par);
        this.t.push(this.formBuilder.group({
          experience: ['', Validators.required],
          college_name: ['', Validators.required],
          duration_from: ['', Validators.required],
          duration_to: ['', Validators.required],
        }));
      }
    }
  }

  SubmitStep3() {
    const formData = new FormData();
    var is_adharcard = false;
    var is_pancard = false;
    var is_passport = false;
    if (this.step3_form.valid) {
      this.spinner.show()
      if (this.step3_form.value.identification_card == 'aadhar_card') {
        is_adharcard = true;
      } else if (this.step3_form.value.identification_card == 'pan_card') {
        is_pancard = true;
      } else {
        is_passport = true;
      }
      formData.append('tch_information', JSON.stringify(this.step3_form.get('edu_details').value));
      formData.append('competency_area', JSON.stringify(this.step3_form.get('competency').value));
      formData.append('is_adharcard', is_adharcard.toString());
      formData.append('is_pancard', is_pancard.toString());
      formData.append('is_passport', is_passport.toString());
      formData.append('tch_resume', this.step3_form.get('tch_information').value);
      formData.append('profile_image', this.step3_form.get('profile_image').value);
      formData.append('id_proof', this.step3_form.get('id_proof').value);
      formData.append('search', this.step3_form.get('search').value);
      formData.append('step', "3");
      this.service.TokenOnPutMethod(formData, "/api/teacher/", "teachinginfo").subscribe(res => {
        if (res.status) {
          this.service.TokenOnGetMethod("/api/", "teacher").subscribe(teacher_res => {
            if (teacher_res.status) {
              this.spinner.hide()
              localStorage.setItem("user_data", JSON.stringify(teacher_res.data));
              this.service.SetHeader()
              this.router.navigate(['/teacher/teacher-profile'])
            }
          })
          // this.router.navigate(['/teacher/teacher-profile'])
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
