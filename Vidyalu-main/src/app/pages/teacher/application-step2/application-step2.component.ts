import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/dialog/dialog.component';
import { ServiceService } from '../../service/service.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-application-step2',
  templateUrl: './application-step2.component.html',
  styleUrls: ['./application-step2.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ApplicationStep2Component implements OnInit {
  user_data = JSON.parse(localStorage.getItem('user_data'));
  name = this.user_data.username
  state_array = [];
  city_array = [];
  state = "";
  city = "";
  email = this.user_data.email;
  fileuploaded = false;
  uploded_msg = "";
  year_array = [];
  // year_array = ["1990", "1991", "1992", "1993", "1994", "1995", "1996", "1997",
  //   "1998", "1999", "2000", "2001", "2002", "2003", "2004", "2005", "2006", "2007",
  //   "2008", "2009", "2010", "2011", "2012", "2013", "2014", "2015", "2016",
  //   "2017", "2018", "2019", "2020", "2021"]

  step2_form = new FormGroup({
    school_details: new FormArray([]),
    study_description: new FormControl("", Validators.required),
    certificate: new FormControl("", Validators.required),
    fileSource: new FormControl(""),
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
    this.t.push(this.formBuilder.group({
      school_name: ['', Validators.required],
      duration_from: ['', Validators.required],
      duration_to: ['', Validators.required],
    }));
  }

  get f() { return this.step2_form.controls; }
  get t() { return this.f.school_details as FormArray; }

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

  onFileChange(event) {
    this.uploded_msg = "";
    if (event.target.files.length > 0) {
      this.fileuploaded = true;
      this.step2_form.patchValue({
        fileSource: event.target.files[0]
      });
      this.uploded_msg = "File uploaded."
    }
  }
 
  Educational_Qualification(param, par) {
    if (this.step2_form.value.school_details[par].duration_to != '' && this.step2_form.value.school_details[par].duration_to != null) {
      if (this.step2_form.value.school_details[par].duration_from > this.step2_form.value.school_details[par].duration_to) {
        this.t.removeAt(par);
        this.t.push(this.formBuilder.group({
          school_name: ['', Validators.required],
          duration_from: ['', Validators.required],
          duration_to: ['', Validators.required],
        }));
      }
    }
  }

  SubmitStep2() {
    const formData = new FormData();
    if (this.step2_form.valid) {
      if (this.fileuploaded) {
        this.spinner.show()
        formData.append('edu_qualification', JSON.stringify(this.step2_form.get('school_details').value));
        formData.append('description', JSON.stringify(this.step2_form.get('study_description').value));
        formData.append('certificate', this.step2_form.get('fileSource').value);
        formData.append('step', "2");
        this.service.TokenOnPutMethod(formData, "/api/teacher/", "eduqualfi").subscribe(res => {
          this.spinner.hide()
          if (res.status) {
            this.router.navigate(['/teacher/application-step3'])
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
