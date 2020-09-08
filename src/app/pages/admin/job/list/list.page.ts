import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material';
import {DialogService} from '../../../../@core/modules/dialog';
import {AuthService} from '../../../auth/auth.service';
import {JobService} from '../job.service';

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
  selector: 'app-admin-job-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss']
})
export class AdminJobListPage {
  user = this.authSvc.currentUser;
  params = {};
  displayedColumns = (() => {
    let result: string[];
    if (this.user.type === 'employee') {
      result = ['select', 'name', 'post', 'level', 'qualification', 'project', 'supplier', 'years', 'nums', 'price'];
    } else {
      result = ['select', 'name', 'post', 'level', 'qualification', 'project', 'supplier', 'years', 'nums', 'price', 'actions'];
    }
    return result;
  })();
  dataSource;
  selection = new SelectionModel<Project>(true, []);

  suppliers;
  projects;

  constructor(private route: ActivatedRoute,
              private dialogSvc: DialogService,
              private authSvc: AuthService,
              private jobService: JobService) {
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
    this.jobService.list().subscribe(res => {
      console.log(res);
      this.dataSource = new MatTableDataSource<Project>(res);
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
  checkboxLabel(row?: Project): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  delete(id) {
    this.dialogSvc.show({content: '您确定要删除吗？', cancel: '不了', confirm: '确定'}).subscribe(res => {
      if (res.value) {
        this.jobService.delete(id).subscribe(() => {
          this.getData();
        });
      }
    });
  }
}
