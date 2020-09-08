import {Component} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {SupplierService} from "../supplier.service";
import {ProjectService} from "../../project/project.service";
import {EmployeeService} from "../../employee/employee.service";
import {MatTableDataSource} from "@angular/material/table";
import {SelectionModel} from "@angular/cdk/collections";

@Component({
  selector: 'app-admin-supplier-item',
  templateUrl: './item.page.html',
  styleUrls: ['./item.page.scss']
})
export class AdminSupplierItemPage {
  id = this.route.snapshot.params.id;
  form;
  displayed = {
    project: ['select', 'name', 'contract', 'department', 'suppliers', 'employee', 'employees', 'status'],
    employee: ['select', 'name', 'post', 'level', 'projects', 'inTime', 'outTime', 'period', 'attendance', 'status']
  };
  source = {
    project: null,
    employee: null,
  };
  selection = {
    project: new SelectionModel<any>(true, []),
    employee: new SelectionModel<any>(true, []),
  };

  constructor(private route: ActivatedRoute,
              private supplierSvc: SupplierService,
              private projectSvc: ProjectService,
              private employeeSvc: EmployeeService) {
    supplierSvc.item(this.id).subscribe(res => {
      this.form = res;
    });
    projectSvc.find({'suppliers': this.id}).subscribe(res => {
      this.source.project = new MatTableDataSource<any>(res);
    });
    employeeSvc.find({'suppliers': this.id}).subscribe(res => {
      this.source.employee = new MatTableDataSource<any>(res);
    })
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
