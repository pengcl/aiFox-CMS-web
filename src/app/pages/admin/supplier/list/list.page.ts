import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material';
import {ProjectService} from "../../project/project.service";
import {SupplierService} from '../supplier.service';
import {Employee} from "../../employee/list/list.page";

export interface Supplier {
  name: string;
  id: string;
  position: number;
  employees: number;
  projects: number;
}

@Component({
  selector: 'app-admin-supplier-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss']
})
export class AdminSupplierListPage implements OnInit {
  routeParams = this.route.snapshot.queryParams;
  params = {};
  displayedColumns: string[] = ['select', 'name', 'projects', 'employees'];
  dataSource;
  selection;
  suppliers;
  projects;

  constructor(private route: ActivatedRoute,
              private supplierSvc: SupplierService,
              private projectSvc: ProjectService) {
    for (const key in this.routeParams) {
      if (this.routeParams[key] && key !== 'type') {
        this.params[key + 's'] = this.routeParams[key];
      }
    }
    projectSvc.list().subscribe(res => {
      this.projects = res;
    });
    this.getData();
  }

  ngOnInit() {

  }

  setType() {
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
    this.supplierSvc.find(this.params).subscribe(res => {
      this.dataSource = new MatTableDataSource<Supplier>(res);
      this.selection = new SelectionModel<Supplier>(true, []);
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
  checkboxLabel(row?: Supplier): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  open() {
  }
}
