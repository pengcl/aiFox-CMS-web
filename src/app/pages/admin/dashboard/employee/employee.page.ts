import {Component} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {AuthService} from '../../../auth/auth.service';
import {ProjectService} from '../../project/project.service';
import {interval as observableInterval} from 'rxjs';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-admin-dashboard-employee',
  templateUrl: './employee.page.html',
  styleUrls: ['./employee.page.scss'],
  providers: [DatePipe]
})
export class AdminDashboardEmployeePage {
  user = this.authSvc.currentUser;
  items: any[] = Array(31)
    .fill(0)
    .map((v: any, i: number) => i);

  timer = new Date();
  tiles = [
    {data: 1, text: '正常', fab: {disabled: true, label: '', color: ''}, disabled: true, fabColor: 'disabled', color: 'lightgreen'},
    {data: 2, text: '正常', disabled: true, fabColor: 'disabled', color: 'lightgreen'},
    {data: 3, text: '缺勤', disabled: false, fabColor: 'danger', color: 'lightpink'},
    {data: 4, text: '正常', disabled: true, fabColor: 'disabled', color: 'lightgreen'},
    {data: 5, text: '正常', disabled: true, fabColor: 'disabled', color: 'lightgreen'},
    {data: 6, text: '正常', disabled: true, fabColor: 'disabled', color: 'lightgreen'},
    {data: 7, text: '异常', disabled: false, fabColor: 'warning', color: '#DDBDF1'},
    {data: 8, text: '正常', disabled: true, fabColor: 'disabled', color: 'lightgreen'},
    {data: 9, text: '正常', disabled: true, fabColor: 'disabled', color: 'lightgreen'},
    {data: 10, text: '正常', disabled: true, fabColor: 'disabled', color: 'lightgreen'},
    {data: 11, text: '正常', disabled: true, fabColor: 'disabled', color: 'lightgreen'},
    {data: 12, text: '正常', disabled: true, fabColor: 'disabled', color: 'lightgreen'},
    {data: 13, text: '正常', disabled: true, fabColor: 'disabled', color: 'lightgreen'},
    {data: 14, text: '正常', disabled: true, fabColor: 'disabled', color: 'lightgreen'},
    {data: 15, text: '正常', disabled: true, fabColor: 'disabled', color: 'lightgreen'},
    {data: 16, text: '正常', disabled: true, fabColor: 'disabled', color: 'lightgreen'},
    {data: 17, text: '正常', disabled: true, fabColor: 'disabled', color: 'lightgreen'},
    {data: 18, text: '正常', disabled: true, fabColor: 'disabled', color: 'lightgreen'},
    {data: 19, text: '正常', disabled: true, fabColor: 'disabled', color: 'lightgreen'},
    {data: 20, text: '正常', disabled: true, fabColor: 'disabled', color: 'lightgreen'},
    {data: 21, text: '异常', disabled: false, fabColor: 'warning', color: '#DDBDF1'},
    {data: 22, text: '正常', disabled: true, fabColor: 'disabled', color: 'lightgreen'},
    {data: 23, text: '正常', disabled: true, fabColor: 'disabled', color: 'lightgreen'},
    {data: 24, text: '正常', disabled: true, fabColor: 'disabled', color: 'lightgreen'},
    {data: 25, text: '正常', disabled: true, fabColor: 'disabled', color: 'lightgreen'},
    {data: 26, text: '异常', disabled: false, fabColor: 'warning', color: '#DDBDF1'},
    {data: 27, text: '签到', disabled: false, fabColor: 'primary', color: 'lightblue'},
    {data: 28, text: 28, disabled: true, fabColor: 'disabled', color: '#999'},
    {data: 29, text: 29, disabled: true, fabColor: 'disabled', color: '#999'},
    {data: 30, text: 30, disabled: true, fabColor: 'disabled', color: '#999'},
    {data: 31, text: 31, disabled: true, fabColor: 'disabled', color: '#999'}
  ];
  form: FormGroup = new FormGroup({
    time: new FormControl('', [Validators.required]),
    code: new FormControl('', [Validators.required, Validators.maxLength(4), Validators.minLength(4)])
  });

  constructor(private authSvc: AuthService, private projectSvc: ProjectService, private datePipe: DatePipe) {
    observableInterval(1000).subscribe(() => {
      this.timer = new Date();
      this.form.get('time').setValue(this.datePipe.transform(this.timer, 'yyyy-MM-dd HH:mm:ss'));
    });
  }

  submit() {
  }

}
