import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-student-purchase-course',
  templateUrl: './student-purchase-course.component.html',
  styleUrls: ['./student-purchase-course.component.scss']
})
export class StudentPurchaseCourseComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

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


}
