import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/dialog/dialog.component';
import { ServiceService } from '../service/service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SocialAuthService } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private spinner: NgxSpinnerService,
    private dialog: MatDialog,
    private service: ServiceService,
    private router: Router, private activatedRoute: ActivatedRoute,
    private authService: SocialAuthService
  ) { }

  login_form = new FormGroup({
    // role: new FormControl("", Validators.required),
    email: new FormControl("", Validators.required),
    password: new FormControl("", Validators.required),
  });

  ngOnInit(): void {
    // localStorage.removeItem("user_token");
    // localStorage.removeItem("user_data");
    // localStorage.getItem("user_data");
    // console.log(localStorage.getItem("user_data"))
    // localStorage.clear()
    // console.log(localStorage)
  }

  login() {
    if (this.login_form.valid) {
      this.spinner.show()
      let param = {
        "email": this.login_form.value.email,
        "password": this.login_form.value.password,
        // "role": this.login_form.value.role,
      }
      this.service.OnPostMethod(param, "/api/", "login").subscribe(res => {
        if (res.status) {
          localStorage.setItem("user_token", res.data.access);
          localStorage.setItem("user_role", res.data.role);
          if (res.data.role == 'student') {
            this.service.TokenOnGetMethod("/api/", "student").subscribe(student_res => {
              if (student_res.status) {
                this.spinner.hide()
                localStorage.setItem("user_data", JSON.stringify(student_res.data));
                this.service.SetHeader()
                // console.log(student_res)
                this.router.navigate(['/student/student-profile']);
              }
            })
          } else if (res.data.role == 'teacher') {
            this.service.TokenOnGetMethod("/api/", "teacher").subscribe(teacher_res => {
              if (teacher_res.status) {
                this.spinner.hide()
                localStorage.setItem("user_data", JSON.stringify(teacher_res.data));
                this.service.SetHeader()
                if(teacher_res.data.step == 0) {
                  this.router.navigate(['/teacher/application-step1'])
                } else if(teacher_res.data.step == 1) {
                  this.router.navigate(['/teacher/application-step2'])
                } else if(teacher_res.data.step == 2) {
                  this.router.navigate(['/teacher/application-step3'])
                } else {
                  this.router.navigate(['/teacher/teacher-profile'])
                }
              }
            })
          } else {
            this.service.TokenOnGetMethod("/api/", "counsellor").subscribe(counsellor_res => {
              if (counsellor_res.status) {
                this.spinner.hide()
                localStorage.setItem("user_data", JSON.stringify(counsellor_res.data));
                this.service.SetHeader()
                if(counsellor_res.data.step == 0) {
                  this.router.navigate(['/counsellor/application-step1'])
                } else if(counsellor_res.data.step == 1) {
                  this.router.navigate(['/counsellor/application-step2'])
                } else if(counsellor_res.data.step == 2) {
                  this.router.navigate(['/counsellor/application-step3'])
                } else {
                  this.router.navigate(['/counsellor/counsellor-profile'])
                }
                // this.router.navigate(['/counsellor/application-step1'])
              }
            })
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

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(x => {
      this.spinner.show();
      let param =
      {
        "firsts_name": x.firstName,
        "email": x.email,
        "last_name": x.lastName,
        "provider": x.provider,
        "id_token": x.idToken,
        "auth_token": x.authToken,
        "id": x.id,
        "username": x.name,
        "profile_image": x.photoUrl,
        "password": "123456"
      }
      this.service.OnPostMethod(param, '/api/', 'google').subscribe(res => {
        this.spinner.hide();
        if (res.status) {
          localStorage.setItem("user_token", res.data.access);
          // localStorage.setItem("user_token", JSON.stringify(res.data.access));

          if (res.data.role == " ") {
            this.router.navigate(['/role']);
          } else {
            localStorage.setItem("user_role", res.data.role);
            if (res.data.role == 'student') {
              this.service.TokenOnGetMethod("/api/", "student").subscribe(student_res => {
                if (student_res.status) {
                  this.spinner.hide()
                  localStorage.setItem("user_data", JSON.stringify(student_res.data));
                  this.service.SetHeader()
                  this.router.navigate(['/student/student-profile']);
                }
              })
            } else if (res.data.role == 'teacher') {
              this.service.TokenOnGetMethod("/api/", "teacher").subscribe(teacher_res => {
                if (teacher_res.status) {
                  this.spinner.hide()
                  localStorage.setItem("user_data", JSON.stringify(teacher_res.data));
                  this.service.SetHeader()
                  this.router.navigate(['/teacher/teacher-profile'])
                }
              })
            } else {
              this.service.TokenOnGetMethod("/api/", "counsellor").subscribe(counsellor_res => {
                if (counsellor_res.status) {
                  this.spinner.hide()
                  localStorage.setItem("user_data", JSON.stringify(counsellor_res.data));
                  this.service.SetHeader()
                  this.router.navigate(['/counsellor/counsellor-profile'])
                }
              })
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
    });
  }

  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then(x => {
      this.spinner.show();
      let param =
      {
        "firsts_name": x.firstName,
        "email": x.email,
        "last_name": x.lastName,
        "provider": x.provider,
        "id_token": x.idToken,
        "auth_token": x.authToken,
        "id": x.id,
        "username": x.name,
        "profile_image": x.photoUrl,
        "password": "123456"
      }
      this.service.OnPostMethod(param, '/api/', 'google').subscribe(res => {
        this.spinner.hide();
        if (res.status) {
          localStorage.setItem("user_token", res.data.access);
          if (res.data.role == " ") {
            this.router.navigate(['/role']);
          } else {
            localStorage.setItem("user_role", res.data.role);
            if (res.data.role == 'student') {
              this.service.TokenOnGetMethod("/api/", "student").subscribe(student_res => {
                if (student_res.status) {
                  this.spinner.hide()
                  localStorage.setItem("user_data", JSON.stringify(student_res.data));
                  this.service.SetHeader()
                  this.router.navigate(['/student/student-profile']);
                }
              })
            } else if (res.data.role == 'teacher') {
              this.service.TokenOnGetMethod("/api/", "teacher").subscribe(teacher_res => {
                if (teacher_res.status) {
                  this.spinner.hide()
                  localStorage.setItem("user_data", JSON.stringify(teacher_res.data));
                  this.service.SetHeader()
                  this.router.navigate(['/teacher/teacher-profile'])
                }
              })
            } else {
              this.service.TokenOnGetMethod("/api/", "counsellor").subscribe(counsellor_res => {
                if (counsellor_res.status) {
                  this.spinner.hide()
                  localStorage.setItem("user_data", JSON.stringify(counsellor_res.data));
                  this.service.SetHeader()
                  this.router.navigate(['/counsellor/counsellor-profile'])
                }
              })
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
    });
  }
}
