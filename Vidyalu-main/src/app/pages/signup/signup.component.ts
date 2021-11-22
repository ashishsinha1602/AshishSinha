import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialog } from '@angular/material/dialog';
// import { ConfirmDialogComponent, ConfirmDialogModel } from 'src/app/confirm-dialog/confirm-dialog.component';
import { DialogComponent } from 'src/app/dialog/dialog.component';
// import * as c3 from 'c3';
import { ServiceService } from '../service/service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SocialAuthService } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  result: string;

  signup_form = new FormGroup({
    role: new FormControl("", Validators.required),
    name: new FormControl("", Validators.required),
    email: new FormControl("", Validators.required),
    password: new FormControl("",
      [Validators.required,
      Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')
      ]
    ),
    confirm_password: new FormControl("", Validators.required),
  }, { validators: this.checkPasswords });

  constructor(private spinner: NgxSpinnerService,
    private dialog: MatDialog,
    private service: ServiceService,
    private router: Router, private activatedRoute: ActivatedRoute,
    private authService: SocialAuthService
  ) { }

  ngOnInit(): void {


    // only dialog

    // this.dialog.open(DialogComponent,{
    //   width: '250px',
    //   data: {title: "", content:"hsadkfhksd"}
    // })

    // confirmation dialog  

    // const message = `Are you sure you want to do this?`;
    // const dialogData = new ConfirmDialogModel("Please Confirm...", message);
    // const dialogRef = this.dialog.open(ConfirmDialogComponent, {
    //   // maxWidth: "400px",
    //   data: dialogData
    // });

    // dialogRef.afterClosed().subscribe(dialogResult => {
    //   this.result = dialogResult;
    //   console.log(dialogResult)
    //   if (this.result) {
    //     console.log("=====in")
    //   }
    // });
  }

  SubmitSignUp() {
    if (this.signup_form.valid) {
      this.spinner.show()
      let param = {
        "username": this.signup_form.value.name,
        "email": (this.signup_form.value.email).toLowerCase(),
        "password": this.signup_form.value.password,
        "retype_password": this.signup_form.value.confirm_password,
        "role": this.signup_form.value.role
      }
      this.service.OnPostMethod(param, "/api/", "register").subscribe(res => {
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

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(x => {
      console.log(x)
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
      console.log(param)
      this.service.OnPostMethod(param, '/api/', 'google').subscribe(res => {
        this.spinner.hide();
        console.log(res)
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
      console.log(x)
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
        console.log(res)
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
