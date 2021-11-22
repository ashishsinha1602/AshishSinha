import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss']
})
export class CourseListComponent implements OnInit {
  constructor() { 
    
  }

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
      img: "assets/images/course-img1.jpg",
      name: "Data Engineer",
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

  coursecarousel = {
    "slidesToShow": 4, 
    "slidesToScroll": 4,
    "nextArrow": "<div class='slick-next'></div>",
    "prevArrow": "<div class='slick-prev'></div>",
    "dots": true,
    "infinite": true,
    "arrows": true,
    "autoplay": true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          arrows: "false"
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          arrows: "false"
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: "false"
        }
      }
    ]
  };

}
