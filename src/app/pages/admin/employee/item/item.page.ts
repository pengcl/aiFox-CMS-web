import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {EmployeeService} from '../employee.service';
import {ProjectService} from '../../project/project.service';
import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material';
import {InterviewService} from '../../interview/interview.service';
import {AttendanceService} from '../../attendance/attendance.service';
import {JobService} from '../../job/job.service';

@Component({
  selector: 'app-admin-employee-item',
  templateUrl: './item.page.html',
  styleUrls: ['./item.page.scss']
})
export class AdminEmployeeItemPage {
  id = this.route.snapshot.params.id;
  form;
  displayed = {
    project: ['select', 'name', 'contract', 'department', 'suppliers', 'employee', 'employees', 'status'],
    interview: ['select', 'project', 'supplier', 'job', 'level', 'status', 'face_test', 'machine_test', 'written_test', 'mark', 'result'],
    attendance: ['select', 'employee', 'project', 'type', 'status', 'address', 'start', 'end', 'mark']
  };
  source = {
    project: null,
    interview: new MatTableDataSource<any>([]),
    attendance: null
  };
  selection = {
    project: new SelectionModel<any>(true, []),
    interview: new SelectionModel<any>(true, []),
    attendance: new SelectionModel<any>(true, [])
  };

  constructor(private route: ActivatedRoute,
              private interviewSvc: InterviewService,
              private attendanceSvc: AttendanceService,
              private projectSvc: ProjectService,
              private jobSvc: JobService,
              private employeeSvc: EmployeeService) {
    employeeSvc.item(this.id).subscribe(res => {
      this.form = res;
      console.log(this.form);
    });
    projectSvc.find({employees: this.id}).subscribe(res => {
      this.source.project = new MatTableDataSource<any>(res);
    });
    interviewSvc.find(this.id).subscribe(res => {
      this.source.interview = new MatTableDataSource<any>(res);
    });
    attendanceSvc.find(this.id).subscribe(res => {
      this.source.attendance = new MatTableDataSource<any>(res);
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
