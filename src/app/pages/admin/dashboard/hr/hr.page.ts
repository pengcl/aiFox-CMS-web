import {Component} from '@angular/core';
import {AuthService} from '../../../auth/auth.service';

@Component({
  selector: 'app-admin-dashboard-hr',
  templateUrl: './hr.page.html',
  styleUrls: ['./hr.page.scss']
})
export class AdminDashboardHrPage {
  projects;
  employees;
  user = this.authSvc.currentUser;
  count = {
    project: 0,
    employee: 0,
    supplier: 0
  };
  colSize = 3;

  constructor(private authSvc: AuthService) {
  }

}
