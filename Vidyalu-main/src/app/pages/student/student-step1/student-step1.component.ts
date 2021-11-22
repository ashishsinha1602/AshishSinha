import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/dialog/dialog.component';
import { ServiceService } from '../../service/service.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-student-step1',
  templateUrl: './student-step1.component.html',
  styleUrls: ['./student-step1.component.scss']
})
export class StudentStep1Component implements OnInit {
  user_data = JSON.parse(localStorage.getItem('user_data'));
  name = this.user_data.username
  state_array = [];
  city_array = [];
  state = "";
  city = "";
  email = this.user_data.email;

  step1_form = new FormGroup({
    name: new FormControl(this.name, Validators.required),
    phone: new FormControl("", Validators.required),
    email: new FormControl(this.email, Validators.required),
    address: new FormControl("", Validators.required),
    state: new FormControl("", Validators.required),
    city: new FormControl("", Validators.required),
    pincode: new FormControl("", Validators.required),
  });

  constructor(private spinner: NgxSpinnerService,
    private dialog: MatDialog,
    private service: ServiceService,
    private router: Router, private activatedRoute: ActivatedRoute
  ) { }
  ngOnInit(): void {
    this.spinner.show()
    this.GetStateCity()
  }

  GetStateCity() {
    this.service.OnGetMethod("/api/", "location").subscribe(res => {
      this.spinner.hide()
      // console.log(res)
      if (res.status) {
        this.state_array = res.data
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

  SubmitStep1() {
    if (this.step1_form.valid) {
      this.spinner.show()
      let param = {
        "full_name": this.step1_form.value.name,
        "phone": this.step1_form.value.phone,
        "email": this.step1_form.value.email,
        "address": this.step1_form.value.address,
        "state": this.step1_form.value.state,
        "city": this.step1_form.value.city,
        "area_code": this.step1_form.value.pincode,
        "step": 1
      }
      this.service.TokenOnPutMethod(param, "/api/student/", "basicinfo").subscribe(res => {
        if (res.status) {
          this.step1_form.reset()
          this.service.TokenOnGetMethod("/api/", "student").subscribe(student_res => {
            if (student_res.status) {
              this.spinner.hide()
              localStorage.setItem("user_data", JSON.stringify(student_res.data));
              this.service.SetHeader()
              this.router.navigate(['/student/student-profile']);
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
        });
    }
  }

}
