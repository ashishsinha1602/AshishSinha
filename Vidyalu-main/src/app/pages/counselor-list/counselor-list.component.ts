import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-counselor-list',
  templateUrl: './counselor-list.component.html',
  styleUrls: ['./counselor-list.component.scss']
})
export class CounselorListComponent implements OnInit {
  user_data = JSON.parse(localStorage.getItem('user_data'));
  name = this.user_data.username
  constructor() { }

  ngOnInit(): void {
    alert(this.name)
  }

  counselors = [
    {
      img: "assets/images/counseling1.jpg",
      name: "Counseling Sessions 1",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod "
    },
    {
      img: "assets/images/counseling1.jpg",
      name: "Counseling Sessions 1",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod "
    },
    {
      img: "assets/images/counseling1.jpg",
      name: "Counseling Sessions 1",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod "
    },
    {
      img: "assets/images/counseling1.jpg",
      name: "Counseling Sessions 1",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod "
    },
    {
      img: "assets/images/counseling1.jpg",
      name: "Counseling Sessions 1",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod "
    },
    {
      img: "assets/images/counseling1.jpg",
      name: "Counseling Sessions 1",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod "
    },
    {
      img: "assets/images/counseling1.jpg",
      name: "Counseling Sessions 1",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod "
    },
    {
      img: "assets/images/counseling1.jpg",
      name: "Counseling Sessions 1",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod "
    },
    {
      img: "assets/images/counseling1.jpg",
      name: "Counseling Sessions 1",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod "
    },

  ]

  counselor = [
    {
      img: "assets/images/counseling1.jpg",
      name: "John Doe",
    },
    {
      img: "assets/images/counseling1.jpg",
      name: "John Doe",
    },
    {
      img: "assets/images/counseling1.jpg",
      name: "John Doe",
    },
    {
      img: "assets/images/counseling1.jpg",
      name: "John Doe",
    },
    {
      img: "assets/images/counseling1.jpg",
      name: "John Doe",
    },
    {
      img: "assets/images/counseling1.jpg",
      name: "John Doe",
    },

  ]

  counselorcarousel = {
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

}
