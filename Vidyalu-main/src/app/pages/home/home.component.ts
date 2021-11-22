import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  user_data = JSON.parse(localStorage.getItem('user_data'));
  name = "";
  constructor() { }

  ngOnInit(): void {
    // localStorage.removeItem("user_token");
    // localStorage.removeItem("user_data");
    if(this.user_data != null && this.user_data != undefined) {
      this.name = this.user_data.username
    }
  }

  category = [
    {
      img: "assets/images/category1.png",
      name: "Design",
    },
    {
      img: "assets/images/category2.png",
      name: "Development",
    },
    {
      img: "assets/images/category3.png",
      name: "Marketing",
    },
    {
      img: "assets/images/category4.png",
      name: "IT & Software",
    },
    {
      img: "assets/images/category1.png",
      name: "Design",
    },

  ];

  catcarousel = {
    "slidesToShow": 4, 
    "slidesToScroll": 4,
    // "nextArrow":"<div class='nav-btn next-slide'></div>",
    // "prevArrow":"<div class='nav-btn prev-slide'></div>",
    "dots": true,
    "infinite": true,
    "arrows": false,
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
          slidesToShow: 2,
          slidesToScroll: 2,
          arrows: "false"
        }
      }
    ]
  };

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

  teacher = [
    {
      img: "assets/images/teacher1.jpg",
      name: "Ardit Sulce",
    },
    {
      img: "assets/images/teacher2.jpg",
      name: "Ardit Sulce",
    },
    {
      img: "assets/images/teacher1.jpg",
      name: "Ardit Sulce",
    },
    {
      img: "assets/images/teacher2.jpg",
      name: "Ardit Sulce",
    },

  ]

  teachercarousel = {
    "slidesToShow": 2, 
    "slidesToScroll": 2,
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
          slidesToShow: 1,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
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

  counselor = [
    {
      img: "assets/images/counselor1.jpg",
      name: "John Doe",
    },
    {
      img: "assets/images/counselor2.jpg",
      name: "John Doe",
    },
    {
      img: "assets/images/counselor3.jpg",
      name: "John Doe",
    },
    {
      img: "assets/images/counselor4.jpg",
      name: "John Doe",
    },
    {
      img: "assets/images/counselor5.jpg",
      name: "John Doe",
    },
    {
      img: "assets/images/counselor3.jpg",
      name: "John Doe",
    },

  ]

  counselorcarousel = {
    "slidesToShow": 5, 
    "slidesToScroll": 5,
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
          slidesToScroll: 3
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
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

  testimonial = [
    {
      img: "assets/images/avatar.jpg",
      name: "David Mccgelin",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel"
    },
    {
      img: "assets/images/avatar.jpg",
      name: "David Mccgelin",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel"
    },
    {
      img: "assets/images/avatar.jpg",
      name: "David Mccgelin",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel"
    },
    {
      img: "assets/images/avatar.jpg",
      name: "David Mccgelin",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel"
    },
    {
      img: "assets/images/avatar.jpg",
      name: "David Mccgelin",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel"
    },
    {
      img: "assets/images/avatar.jpg",
      name: "David Mccgelin",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel"
    },

  ]

  testicarousel = {
    "slidesToShow": 2, 
    "slidesToScroll": 2,
    "nextArrow": "<div class='slick-next'></div>",
    "prevArrow": "<div class='slick-prev'></div>",
    "dots": true,
    "infinite": true,
    "arrows": false,
    "autoplay": true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
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
