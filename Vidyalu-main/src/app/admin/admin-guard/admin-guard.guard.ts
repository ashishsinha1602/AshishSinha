import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AdminserviceService } from '../admin-service/adminservice.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuardGuard implements CanActivate {
 
  constructor(private service:AdminserviceService, private router:Router){}

  canActivate():boolean {
    if (this.service.AdminLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['/admin']);
      return false;
    }
  }
  
}
