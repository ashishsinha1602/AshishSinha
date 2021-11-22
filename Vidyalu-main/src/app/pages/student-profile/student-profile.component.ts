import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-student-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.scss']
})
export class StudentProfileComponent implements OnInit {
  user_data = JSON.parse(localStorage.getItem('user_data'));
  name = "";
  image = "";
  email = "";
  image_path = environment.Api_Url;
  phone = "";
  state = "";
  zip_code = "";
  city = "";

  constructor(
    private router: Router, private activatedRoute: ActivatedRoute,
  ) { }

  courses = [
    {
      img: "assets/images/course-img1.jpg",
      name: "Data Engineer",
      difficulty: "Intermediate"
    },
    {
      img: "assets/images/course-img2.jpg",
      name: "Data Scientist",
      difficulty: "Intermediate"
    },
    {
      img: "assets/images/course-img3.jpg",
      name: "Data Structures and Al...",
      difficulty: "Intermediate"
    },
    {
      img: "assets/images/course-img4.jpg",
      name: "Programming for Data...",
      difficulty: "Intermediate"
    },
    {
      img: "assets/images/course-img2.jpg",
      name: "Data Scientist",
      difficulty: "Intermediate"
    },

  ]

  course = [
    {
      img: "assets/images/course-img1.jpg",
      name: "Data Engineer",
    },
    {
      img: "assets/images/course-img2.jpg",
      name: "Data Scientist",
    },
    {
      img: "assets/images/course-img3.jpg",
      name: "Data Structures and Al...",
    },
    {
      img: "assets/images/course-img4.jpg",
      name: "Programming for Data...",
    },
    {
      img: "assets/images/course-img2.jpg",
      name: "Data Scientist",
    },

  ]

  ngOnInit(): void {
    if (this.user_data != null && this.user_data != undefined) {
        if (this.user_data.step == 0) {
        this.router.navigate(['/student/application-step1'])
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
