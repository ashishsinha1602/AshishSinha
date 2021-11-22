import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/dialog/dialog.component';
import { ServiceService } from '../service/service.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})
export class RoleComponent implements OnInit {
  user_data: any;
  auth_token = localStorage.getItem("user_token")
  // localStorage.setItem("user_token", JSON.stringify(res.data.access));

  name = "";
  email = "";
  role_form = new FormGroup({
    role: new FormControl("", Validators.required),
  });

  constructor(private spinner: NgxSpinnerService,
    private dialog: MatDialog,
    private service: ServiceService,
    private router: Router, private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    console.log(localStorage)
    console.log(this.auth_token)
    // this.spinner.show()
    // this.GetUserDetails()
  }

  // GetUserDetails() {
  //   this.service.TokenOnGetMethod("/api/", "student").subscribe(res => {
  //     this.spinner.hide()
  //     console.log(res)
  //     if (res.status) {
  //       // this.router.navigate(['/login']);
  //       localStorage.setItem("user_data", JSON.stringify(res.data));
  //       this.service.SetHeader()
  //       this.user_data = JSON.parse(localStorage.getItem('user_data'))
  //       this.name = this.user_data.username;
  //       this.email = this.user_data.email;
  //     }
  //   },
  //     err => {
  //       console.log(err);
  //       this.spinner.hide()
  //       this.dialog.open(DialogComponent, {
  //         width: '270px',
  //         data: { title: "", content: err.error.message }
  //       })
  //     });
  // }

  SubmitRole() {
    if (this.role_form.valid) {
      this.spinner.show()
      let param = {
        "role": this.role_form.value.role,
        // "auth_token": this.auth_token
      }
      console.log(param)
      this.service.TokenOnPutMethod(param, "/api/role/", "update").subscribe(res => {
        this.spinner.hide()
        console.log(res)
        if (res.status) {

          if (this.role_form.value.role == 'student') {
            this.service.TokenOnGetMethod("/api/", "student").subscribe(student_res => {
                console.log(student_res)
                console.log(localStorage)
              if (student_res.status) {
                this.spinner.hide()
                localStorage.setItem("user_role", this.role_form.value.role);
                localStorage.setItem("user_data", JSON.stringify(student_res.data));
                this.service.SetHeader()
                this.router.navigate(['/student/student-profile']);
              }
            })
          } else if (this.role_form.value.role == 'teacher') {
            this.service.TokenOnGetMethod("/api/", "teacher").subscribe(teacher_res => {
              if (teacher_res.status) {
                this.spinner.hide()
                localStorage.setItem("user_role", this.role_form.value.role);
                localStorage.setItem("user_data", JSON.stringify(teacher_res.data));
                this.service.SetHeader()
                this.router.navigate(['/teacher/teacher-profile'])
              }
            })
          } else {
            this.service.TokenOnGetMethod("/api/", "counsellor").subscribe(counsellor_res => {
              if (counsellor_res.status) {
                this.spinner.hide()
                localStorage.setItem("user_role", this.role_form.value.role);
                localStorage.setItem("user_data", JSON.stringify(counsellor_res.data));
                this.service.SetHeader()
                this.router.navigate(['/counsellor/counsellor-profile'])
              }
            })
          }



          // this.router.navigate(['/login']);
          // this.user_data.role = this.role_form.value.role
          // if (this.role_form.value.role == 'student') {
          //   this.router.navigate(['/student/student-profile']);
          // } else if (this.role_form.value.role == 'teacher') {
          //   this.router.navigate(['/teacher/teacher-profile'])
          // } else {
          //   this.router.navigate(['/counsellor/counsellor-profile'])
          // }
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

}
