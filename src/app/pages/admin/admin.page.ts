import {Component} from '@angular/core';
import {DialogService} from '../../@core/modules/dialog';
import {AuthService} from '../auth/auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss']
})
export class AdminPage {
  user = this.authSvc.currentUser;

  constructor(private dialogSvc: DialogService,
              private authSvc: AuthService) {
  }

  sign() {
    console.log(this.user);
    this.dialogSvc.show({title: '当前时间', content: '2019-11-08 18:30:12', confirm: '签到', cancel: '提交工时'}).subscribe(res => {
      console.log(res);
    });
  }

}
