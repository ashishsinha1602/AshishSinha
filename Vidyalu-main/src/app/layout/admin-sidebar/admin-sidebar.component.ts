import { Component, OnInit } from '@angular/core';
import { AdminserviceService } from '../../admin/admin-service/adminservice.service';
import { environment } from '../../../environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceService } from '../../pages/service/service.service';

@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './admin-sidebar.component.html',
  styleUrls: ['./admin-sidebar.component.scss']
})
export class AdminSidebarComponent implements OnInit {
  role = localStorage.getItem('user_role');

  constructor(private service: AdminserviceService,
    private router: Router, private activatedRoute: ActivatedRoute,
    private userService: ServiceService) { }

  ngOnInit(): void {
  }

  User_Logout() {
    this.userService.UserLogOut()
    this.router.navigate(['/login']);
    setTimeout(() => {
      window.location.reload()
    }, 300);
  }
}
