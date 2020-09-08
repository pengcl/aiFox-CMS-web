import {Component} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material';
import {ProjectService} from "../../project/project.service";
import {SupplierService} from "../../supplier/supplier.service";
import {EmployeeService} from '../employee.service';

export interface Employee {
  name: string;
  id: string;
  position: number;
  inTime: string;
  outTime: string;
  period: number;
  post: string;
  level: string;
  projects: any;
  attendance: number;
  status: string;
}

@Component({
  selector: 'app-admin-employee-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss']
})
export class AdminEmployeeListPage {
  routeParams = this.route.snapshot.queryParams;
  params = {};
  displayedColumns: string[] = [
    'select',
    'name',
    'post',
    'level',
    'projects',
    'inTime',
    'outTime',
    'period',
    'attendance',
    'status',
    'actions'
  ];
  selection = new SelectionModel<Employee>(true, []);
  dataSource;
  suppliers;
  projects;

  constructor(private route: ActivatedRoute,
              private projectSvc: ProjectService,
              private supplierSvc: SupplierService,
              private employeeSvc: EmployeeService) {
    for (const key in this.routeParams) {
      if (this.routeParams[key] && key !== 'type') {
        this.params[key + 's'] = this.routeParams[key];
      }
    }
    projectSvc.list().subscribe(res => {
      this.projects = res;
    });
    supplierSvc.list().subscribe(res => {
      this.suppliers = res;
    });
    this.getData();
  }

  valueChange(target, e) {
    this.params[target] = e;
    const params = {};
    for (const key in this.params) {
      if (this.params[key]) {
        params[key] = this.params[key];
      }
    }
    this.params = params;
    this.getData();
  }

  getData() {
    this.employeeSvc.find(this.params).subscribe(res => {
      console.log(res);
      this.dataSource = new MatTableDataSource<Employee>(res);
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Employee): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }
}
