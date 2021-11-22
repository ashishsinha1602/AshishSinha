import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-student-records',
  templateUrl: './student-records.component.html',
  styleUrls: ['./student-records.component.scss']
})
export class StudentRecordsComponent implements OnInit {

  constructor() { }

  dtOptions: DataTables.Settings = {};

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
    };
  }

}
