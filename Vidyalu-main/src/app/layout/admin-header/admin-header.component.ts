import { Component, OnInit } from '@angular/core';
import { AdminserviceService } from '../../admin/admin-service/adminservice.service';
import { environment } from '../../../environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceService } from '../../pages/service/service.service';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.scss']
})
export class AdminHeaderComponent implements OnInit {
  admin_data = JSON.parse(localStorage.getItem('admin_data'));
  user_data = JSON.parse(localStorage.getItem('user_data'));
  name = "";
  image = "";
  image_path = environment.Api_Url
  role="";
  constructor(private service: AdminserviceService,
    private router: Router, private activatedRoute: ActivatedRoute,
    private userService : ServiceService) { }

  ngOnInit(): void {
    if (this.admin_data != null && this.admin_data != undefined) {
      this.name = this.admin_data.username
      this.role = localStorage.getItem('user_role');
      if (this.admin_data.profile_image != null && this.admin_data.profile_image != undefined
        && this.admin_data.profile_image != '') {
        this.image = this.image_path + this.admin_data.profile_image;
      }
    }

    this.userService.getLoggedInName.subscribe(name => {
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

  Admin_Logout() {
    this.service.AdminLogOut()
    window.location.reload()
    this.router.navigate(['/admin'])
  }

  User_Logout() {
    this.userService.UserLogOut()
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
