import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/dialog/dialog.component';
import { ServiceService } from '../service/service.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  uidb64 = "";
  token = "";

  constructor(private spinner: NgxSpinnerService,
    private dialog: MatDialog,
    private service: ServiceService,
    private router: Router, private activatedRoute: ActivatedRoute,
  ) { }

  reset_form = new FormGroup({
    password: new FormControl("",
      [Validators.required,
      Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')
      ]
    ),
    confirm_password: new FormControl("", Validators.required),
  }, { validators: this.checkPasswords })


  ngOnInit(): void {
    var url = new URL(window.location.href)
    this.uidb64 = url.searchParams.get("uidb64")
    this.token = url.searchParams.get("token")
  }

  Reset_Password() {
    if (this.reset_form.valid) {
      this.spinner.show()
      let param = {
        "new_password": this.reset_form.value.password,
        // "retype_password": this.reset_form.value.password,
        "token": this.token,
        "uidb64": this.uidb64
      }
      this.service.OnPatchMethod(param, "/api/password/reset/", "confirmPasswordReset").subscribe(res => {
        this.spinner.hide()
        if (res.status) {
          this.dialog.open(DialogComponent, {
            width: '250px',
            data: { title: "", content: res.message }
          })
          this.router.navigate(['/login']);
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

  }

  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
    let pass = group.get('password').value;
    let confirmPass = group.get('confirm_password').value;
    if (confirmPass != "") {
      return pass === confirmPass ? null : { notSame: true }
    }
  }

}
