import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/dialog/dialog.component';
import { ServiceService } from '../../service/service.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-app-step2',
  templateUrl: './app-step2.component.html',
  styleUrls: ['./app-step2.component.scss']
})
export class AppStep2Component implements OnInit {
  profile_uploded_msg = "";
  profile_fileuploaded = false;
  uploded_msg = "";
  fileuploaded = false;

  step2_form = new FormGroup({
    service: new FormArray([]),
    award: new FormArray([]),
    certificate: new FormControl("", Validators.required),
    profile_image: new FormControl("", Validators.required),
  });

  constructor(private spinner: NgxSpinnerService,
    private dialog: MatDialog,
    private service: ServiceService,
    private router: Router, private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.t.push(this.formBuilder.group({
      service: ['', Validators.required],
    }));
    this.p.push(this.formBuilder.group({
      award: ['', Validators.required],
    }));
  }

  get f() { return this.step2_form.controls; }
  get t() { return this.f.service as FormArray; }

  get g() { return this.step2_form.controls; }
  get p() { return this.g.award as FormArray; }

  AddServiceDetails() {
    this.t.push(this.formBuilder.group({
      service: ['', Validators.required],
    }));
  }

  delete_service_details(numder) {
    this.t.removeAt(numder - 1);
  }

  AddAwardDetails() {
    this.p.push(this.formBuilder.group({
      award: ['', Validators.required],
    }));
  }

  delete_award_details(numder) {
    this.p.removeAt(numder - 1);
  }

  onFileChange(event) {
    this.uploded_msg = "";
    if (event.target.files.length > 0) {
      this.fileuploaded = true;
      this.step2_form.patchValue({
        certificate: event.target.files[0]
      });
      this.uploded_msg = "Certificate uploaded."
    }
  }

  ProfileChange(event) {
    this.profile_uploded_msg = "";
    if (event.target.files.length > 0) {
      this.profile_fileuploaded = true;
      this.step2_form.patchValue({
        profile_image: event.target.files[0]
      });
      this.profile_uploded_msg = "Profile uploaded."
    }
  }

  SubmitStep2() {
    const formData = new FormData();
    if (this.step2_form.valid) {
      if (this.fileuploaded && this.profile_fileuploaded) {
        this.spinner.show()
        formData.append('services', JSON.stringify(this.step2_form.get('service').value));
        formData.append('awards', JSON.stringify(this.step2_form.get('award').value));
        formData.append('certificate', this.step2_form.get('certificate').value);
        formData.append('profile_image', this.step2_form.get('profile_image').value);
        formData.append('step', "2");
        this.service.TokenOnPutMethod(formData, "/api/counsellor/", "appform").subscribe(res => {
          this.spinner.hide()
          if (res.status) {
            this.router.navigate(['/counsellor/application-step3'])
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
