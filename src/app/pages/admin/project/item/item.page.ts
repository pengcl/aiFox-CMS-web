import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ContractService} from '../../contract/employee.service';
import {DepartmentService} from '../../department/department.service';
import {PostService} from '../../post/post.service';
import {ProjectService} from '../project.service';
import {SelectionModel} from '@angular/cdk/collections';
import {JobService} from '../../job/job.service';
import {EmployeeService} from '../../employee/employee.service';
import {MatTableDataSource} from '@angular/material';

export interface Post {
  name: string;
  id: string;
  position: number;
}

@Component({
  selector: 'app-admin-project-item',
  templateUrl: './item.page.html',
  styleUrls: ['./item.page.scss']
})
export class AdminProjectItemPage {
  id = this.route.snapshot.params.id;
  contracts;
  departments;
  jobs;
  employees;
  data;
  form;
  charge = '彭琛岚';

  displayed = {
    job: ['select', 'name', 'level', 'qualification', 'years', 'supplier', 'inTime', 'nums', 'days', 'used', 'actions'],
    employee: ['select', 'name', 'post', 'level', 'projects', 'inTime', 'outTime', 'period', 'attendance', 'status'],
    project: ['select', 'name', 'contract', 'department', 'suppliers', 'employee', 'employees', 'status']
  };
  source = {
    job: null,
    employee: null,
    project: null
  };
  selection = {
    job: new SelectionModel<any>(true, []),
    employee: new SelectionModel<any>(true, []),
    project: new SelectionModel<any>(true, [])
  };

  constructor(private route: ActivatedRoute,
              private contractSvc: ContractService,
              private departmentSvc: DepartmentService,
              private postSvc: PostService,
              private jobSvc: JobService,
              private employeeSvc: EmployeeService,
              private projectSvc: ProjectService) {
    jobSvc.list().subscribe(res => {
      this.jobs = res;
      console.log(this.jobs);
      this.source.job = new MatTableDataSource<any>(res);
    });
    contractSvc.list().subscribe(res => {
      this.contracts = res;
    });
    departmentSvc.list().subscribe(res => {
      this.departments = res;
    });
    projectSvc.employees().subscribe(res => {
      this.employees = res;
      this.source.employee = new MatTableDataSource<any>(res);
    });
    projectSvc.list().subscribe(res => {
      this.source.project = new MatTableDataSource<any>(res);
    });
    projectSvc.item(this.id).subscribe(res => {
      this.data = res;
      this.form = res;
    });
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected(target) {
    const numSelected = this.selection[target].selected.length;
    const numRows = this.source[target].data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle(target) {
    this.isAllSelected(target) ?
      this.selection[target].clear() :
      this.source[target].data.forEach(row => this.selection[target].select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(target?, row?: any): string {
    if (!row) {
      return `${this.isAllSelected(target) ? 'select' : 'deselect'} all`;
    }
    return `${this.selection[target].isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

}
