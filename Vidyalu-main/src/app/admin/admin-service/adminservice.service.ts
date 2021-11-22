import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { config } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminserviceService {

  private ROOT_URL = environment.Api_Url;
  token = "";

  headers = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private http: HttpClient, private router: Router) { }

  OnPostMethod(config, nodepage, url) {
    return this.http.post<any>(this.ROOT_URL + nodepage + url, config);
  }

  OnGetMethod(nodepage, url) {
    return this.http.get<any>(this.ROOT_URL + nodepage + url);
  }

  AdminLoggedIn() {
    return !!localStorage.getItem("admin_token");
  }

  TokenOnGetMethod(nodepage, url) {
    this.token = localStorage.getItem("admin_token")
    this.headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.token);
      return this.http.get<any>(this.ROOT_URL + nodepage + url, { headers: this.headers });
  }

  TokenOnPutMethod(config, nodepage, url) {
    this.token = localStorage.getItem("admin_token")
    this.headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.token);
    return this.http.put<any>(this.ROOT_URL + nodepage + url, config, { headers: this.headers });
  }

  AdminLogOut() {
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_data");
    // this.router.navigate(["/admin"]);
  }

}
