import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular';
import { environment } from '../../../environments/environment';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-counselor-profile',
  templateUrl: './counselor-profile.component.html',
  styleUrls: ['./counselor-profile.component.scss']
})
export class CounselorProfileComponent implements OnInit {
  user_data = JSON.parse(localStorage.getItem('user_data'));
  name = "";
  image = "";
  email = "";
  phone = "";
  city = "";
  state = "";
  zip_code = "";
  image_path = environment.Api_Url;

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    events: [
      { title: '3', date: '2020-10-06' },
      { title: '2', date: '2020-10-10' }
    ]
  };
  handleDateClick(arg) {
    alert('date click! ' + arg.dateStr)
  }

  constructor(
    private router: Router, private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    console.log(this.user_data)
    if (this.user_data != null && this.user_data != undefined) {
      if (this.user_data.step == 0) {
        this.router.navigate(['/counsellor/application-step1'])
      } else if (this.user_data.step == 1) {
        this.router.navigate(['/counsellor/application-step2'])
      } else if (this.user_data.step == 2) {
        this.router.navigate(['/counsellor/application-step3'])
      } else {
        this.name = this.user_data.username;
        this.email = this.user_data.email;
        this.phone = this.user_data.phone;
        this.city = this.user_data.city;
        this.state = this.user_data.state;
        this.zip_code = this.user_data.zip_code;
        if ((this.user_data.profile_img == '' || this.user_data.profile_img == null)
          && (this.user_data.photo_url == '' || this.user_data.photo_url == null)) {
          this.image = "assets/images/avatar.jpg"
        } else {
          if ((this.user_data.profile_img == '' || this.user_data.profile_img == null)
            && (this.user_data.photo_url != '' || this.user_data.photo_url != null)) {
            this.image = this.user_data.photo_url
          } else {
            this.image = this.image_path + this.user_data.profile_img
          }
        }
      }
    }
  }

}
  