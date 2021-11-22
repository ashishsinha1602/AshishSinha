import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ServiceService } from '../../pages/service/service.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  user_data = JSON.parse(localStorage.getItem('user_data'));;
  name = "";
  image = "";
  image_path = environment.Api_Url;
  role = "";
  constructor(private service: ServiceService,
    private router: Router, private activatedRoute: ActivatedRoute,) { }

  ngOnInit(): void {
    this.service.getLoggedInName.subscribe(name => {
      this.user_data = JSON.parse(localStorage.getItem('user_data'));
      this.name = this.user_data.username;
      this.role = localStorage.getItem('user_role');
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
    })
    if (this.user_data != null && this.user_data != undefined) {
      this.name = this.user_data.username;
      this.role = localStorage.getItem('user_role');
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

  User_Logout() {
    this.service.UserLogOut()
    this.router.navigate(['/login']);
    setTimeout(() => {
      window.location.reload()
    }, 300);
  }

  UserProfile() {
    if (this.role == 'teacher') {
      this.router.navigate(['/teacher/teacher-profile'])
    } else if (this.role == 'counsellor') {
      this.router.navigate(['/counsellor/counsellor-profile'])
    } else {
      this.router.navigate(['/student/student-profile'])
    }
  }

}
