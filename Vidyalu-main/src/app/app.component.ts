import { Component } from '@angular/core';
import { NavigationEnd, Router, RoutesRecognized } from '@angular/router';

export enum Layouts {
  header,
  adminheader,
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  Layouts = Layouts;
  layout: Layouts;

  title = 'vidyalu';
  constructor(
    private router: Router
  ) { }
  ngOnInit() {
    this.router.events.subscribe((data) => {
      if (data instanceof RoutesRecognized) {
        this.layout = data.state.root.firstChild.data.layout;
        
        // login and without login header seperation

        // if(data.state.root.firstChild.data.layout == 0) {
        //   if(this.user_data != null && this.user_data != undefined) {
        //     this.layout = 1;
        //   } else {
        //   this.layout = data.state.root.firstChild.data.layout;
        //   }
        // } else {
        //   this.layout = data.state.root.firstChild.data.layout;
        // }
      }
    });
  }
}
