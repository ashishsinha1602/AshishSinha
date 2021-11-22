import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/dialog/dialog.component';
import { AdminserviceService } from '../admin-service/adminservice.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent implements OnInit {

  constructor(private spinner: NgxSpinnerService,
    private dialog: MatDialog,
    private service: AdminserviceService,
    private router: Router, private activatedRoute: ActivatedRoute,
  ) { }

  login_form = new FormGroup({
    email: new FormControl("", Validators.required),
    password: new FormControl("", Validators.required),
  });

  ngOnInit(): void {
  }

  login() {
    if (this.login_form.valid) {
      this.spinner.show()
      let param = {
        "email": this.login_form.value.email,
        "password": this.login_form.value.password
      }
      this.service.OnPostMethod(param, "/api/admin/", "login").subscribe(res => {
        console.log(res)
        if (res.status) {
          localStorage.setItem("admin_token", res.data.access);
          localStorage.setItem("user_role", res.data.role);
          this.service.TokenOnGetMethod("/api/admin/", "view").subscribe(admin_res => {
            if (admin_res.status) {
              this.spinner.hide()
              localStorage.setItem("admin_data", JSON.stringify(admin_res.data));
              // console.log(localStorage)
              this.router.navigate(['/admin/dashboard'])
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
