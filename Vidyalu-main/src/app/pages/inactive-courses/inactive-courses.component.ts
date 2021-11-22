import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inactive-courses',
  templateUrl: './inactive-courses.component.html',
  styleUrls: ['./inactive-courses.component.scss']
})
export class InactiveCoursesComponent implements OnInit {

  constructor() { }

  dtOptions: DataTables.Settings = {};

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
    };
  }

}
