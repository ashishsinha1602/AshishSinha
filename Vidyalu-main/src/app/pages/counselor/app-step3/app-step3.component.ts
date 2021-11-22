import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/dialog/dialog.component';
import { ServiceService } from '../../service/service.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-app-step3',
  templateUrl: './app-step3.component.html',
  styleUrls: ['./app-step3.component.scss']
})
export class AppStep3Component implements OnInit {
  id_uploded_msg = "";
  id_fileuploaded = false;
  identification_text = ""

  step3_form = new FormGroup({
    identification_card: new FormControl("", Validators.required),
    id_proof: new FormControl("", Validators.required),
    search: new FormControl("", Validators.required),
  });

  constructor(private spinner: NgxSpinnerService,
    private dialog: MatDialog,
    private service: ServiceService,
    private router: Router, private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
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
      formData.append('is_adharcard', is_adharcard.toString());
      formData.append('is_pancard', is_pancard.toString());
      formData.append('is_passport', is_passport.toString());
      formData.append('id_proof', this.step3_form.get('id_proof').value);
      formData.append('search', this.step3_form.get('search').value);
      formData.append('step', "3");
      this.service.TokenOnPutMethod(formData, "/api/counsellor/", "uploaddoc").subscribe(res => {
        if (res.status) {
          this.service.TokenOnGetMethod("/api/", "counsellor").subscribe(teacher_res => {
            if (teacher_res.status) {
              this.spinner.hide()
              localStorage.setItem("user_data", JSON.stringify(teacher_res.data));
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
