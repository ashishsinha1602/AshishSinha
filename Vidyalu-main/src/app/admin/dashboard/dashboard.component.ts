import { Component, OnInit } from '@angular/core';
import * as c3 from 'c3';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    var chart = c3.generate({
      bindto: '#adminchart',
      data: {
        x: 'x',
        columns: [
            ['x', '2021-01-01', '2021-01-02', '2021-01-03', '2021-01-04', '2021-01-05', '2021-01-06'],
            ['New Students', 30, 200, 160, 320, 280, 310],
            ['Faild Students', 20, 40, 10, 18, 22, 30],
            ['Passed Students', 100, 140, 110, 250, 180, 240]
        ]
    },
    axis: {
        x: {
            type: 'timeseries',
            tick: {
                format: '%Y-%m-%d'
            }
        }
    }
    });

    var chart = c3.generate({
      bindto: '#admindonut',
      data: {
          columns: [
              ['Total Refund', 130],
              ['Total Earn', 562],
          ],
          type : 'donut',
          onclick: function (d, i) { console.log("onclick", d, i); },
          onmouseover: function (d, i) { console.log("onmouseover", d, i); },
          onmouseout: function (d, i) { console.log("onmouseout", d, i); }
      },
      donut: {
          title: "Payment History"
      }
  });

  }

}
