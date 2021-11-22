import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable, Output } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, config, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import * as XLSX from 'xlsx';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  private ROOT_URL = environment.Api_Url;
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  token = '';
  config = {};
  constructor(private http: HttpClient, private router: Router) {
  }
  public getLoggedInName = new Subject();

  OnPostMethod(config, nodepage, url) {
    return this.http.post<any>(this.ROOT_URL + nodepage + url, config);
  }

  OnGetMethod(nodepage, url) {
    return this.http.get<any>(this.ROOT_URL + nodepage + url);
  }

  OnPatchMethod(config, nodepage, url) {
    return this.http.patch<any>(this.ROOT_URL + nodepage + url, config);
  }

  TokenOnGetMethod(nodepage, url) {
    this.token = localStorage.getItem("user_token")
    this.headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.token);
    return this.http.get<any>(this.ROOT_URL + nodepage + url, { headers: this.headers });
  }

  SetHeader() {
    this.getLoggedInName.next("fullName")
  }

  UserLogOut() {
    localStorage.removeItem("user_token");
    localStorage.removeItem("user_data");
    localStorage.removeItem("user_role");
  }

  TeacherLoggedIn() {
    if (localStorage.getItem("user_token") != null && localStorage.getItem("user_role") == 'teacher') {
      return true
    } else {
      return false
    }
    // return !!localStorage.getItem("user_token");
  }

  StudentLoggedIn() {
    if (localStorage.getItem("user_token") != null && localStorage.getItem("user_role") == 'student') {
      return true
    } else {
      return false
    }
  }

  CounsellorLoggedIn() {
    if (localStorage.getItem("user_token") != null && localStorage.getItem("user_role") == 'counsellor') {
      return true
    } else {
      return false
    }
  }

  OnPutMethod(config, nodepage, url) {
    return this.http.put<any>(this.ROOT_URL + nodepage + url, config);
  }

  TokenOnPutMethod(config, nodepage, url) {
    this.token = localStorage.getItem("user_token")
    this.headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.token);
    return this.http.put<any>(this.ROOT_URL + nodepage + url, config, { headers: this.headers });
  }

  TokenOnPostMethod(config, nodepage, url) {
    this.token = localStorage.getItem("user_token")
    this.headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.token);
    return this.http.post<any>(this.ROOT_URL + nodepage + url, config, { headers: this.headers });
  }

  public download_data(json: any[], excelFileName: string): void {
    const book = XLSX.utils.book_new();
    const sheet = XLSX.utils.json_to_sheet(json);
    XLSX.utils.book_append_sheet(book, sheet, "test");
    XLSX.writeFile(book, excelFileName + ".xlsx");
  }

}
