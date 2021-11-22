import { Component, OnInit } from '@angular/core';
import * as c3 from 'c3';

@Component({
  selector: 'app-final-result',
  templateUrl: './final-result.component.html',
  styleUrls: ['./final-result.component.scss']
})
export class FinalResultComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    var chart = c3.generate({
      bindto: '#chart',
      data: {
        columns: [
          ['Your', 50, 20, 10, 40, 15, 25],
          ['Topper', 30, 200, 100, 400, 150, 250]
        ]
      },
    });
  }

}
