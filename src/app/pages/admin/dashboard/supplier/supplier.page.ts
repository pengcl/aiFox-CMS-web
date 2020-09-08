import {Component} from '@angular/core';
import {AuthService} from '../../../auth/auth.service';
import {ProjectService} from '../../project/project.service';
import {EmployeeService} from '../../employee/employee.service';
import {SupplierService} from '../../supplier/supplier.service';

@Component({
  selector: 'app-admin-dashboard-supplier',
  templateUrl: './supplier.page.html',
  styleUrls: ['./supplier.page.scss']
})
export class AdminDashboardSupplierPage {
  projects;
  employees;
  user = this.authSvc.currentUser;
  count = {
    project: 0,
    employee: 0,
    supplier: 0
  };
  colSize = 2;

  constructor(private authSvc: AuthService,
              private projectSvc: ProjectService,
              private employeeSvc: EmployeeService,
              private supplierSvc: SupplierService) {
    console.log(this.user);
    projectSvc.count().subscribe(res => {
      this.count.project = res;
    });
    employeeSvc.count().subscribe(res => {
      this.count.employee = res;
    });
    projectSvc.list().subscribe(res => {
      this.projects = res;
    });
    employeeSvc.list().subscribe(res => {
      this.employees = res;
    });
  }

}
