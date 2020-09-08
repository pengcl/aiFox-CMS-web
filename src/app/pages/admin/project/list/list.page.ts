import {Component} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {SelectionModel} from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import {ProjectService} from '../project.service';
import {SupplierService} from "../../supplier/supplier.service";

export interface Project {
  name: string;
  contract: string;
  department: string;
  employee: string;
  id: string;
  position: number;
  suppliers: number;
  employees: number;
  status: string;
}

@Component({
  selector: 'app-admin-project-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss']
})
export class AdminProjectListPage {
  routeParams = this.route.snapshot.queryParams;
  params = {};
  displayedColumns: string[] = ['select', 'name', 'contract', 'department', 'suppliers', 'employee', 'employees', 'status'];
  dataSource;
  selection = new SelectionModel<Project>(true, []);
  suppliers;
  constructor(private route: ActivatedRoute,
              private supplierSvc: SupplierService,
              private projectSvc: ProjectService) {
    for (const key in this.routeParams) {
      if (this.routeParams[key] && key !== 'type') {
        this.params[key + 's'] = this.routeParams[key];
      }
    }
    supplierSvc.list().subscribe(res=>{
      this.suppliers = res;
    });
    this.getData();
  }

  getData() {
    this.projectSvc.find(this.params).subscribe(res => {
      this.dataSource = new MatTableDataSource<Project>(res);
    });
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
  checkboxLabel(row?: Project): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }
}
