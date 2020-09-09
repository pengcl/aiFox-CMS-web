import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {mergeMap as observableMargeMap} from 'rxjs/operators';

import {StorageService} from '../../@core/services/storage.service';
import {AuthService} from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss']
})
export class AuthPage implements OnInit {
  form: FormGroup;
  randomImage = null;

  constructor(private router: Router,
              private storageSvc: StorageService,
              private authSvc: AuthService) {
    this.form = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(16)]),
      password: new FormControl('', [Validators.required]),
      captcha: new FormControl('', [Validators.required]),
      checkKey: new FormControl(new Date().getTime(), [Validators.required]),
      remember_me: new FormControl(true, [Validators.required])
    });
  }

  ngOnInit() {
    this.getRandomImage();
  }

  login() {
    if (this.form.invalid) {
      return false;
    }
    this.authSvc.login(this.form.value).subscribe(res => {
      // 设置用户Token信息
      this.authSvc.updateLoginStatus({
        jwt: res.result.token,
        departs: res.result.departs,
        dictItems: res.result.sysAllDictItems,
        user: res.result.userInfo
      });
      this.getPermissions(res.result.token);
    });

  }

  getPermissions(token) {
    this.authSvc.permissions(token).subscribe(res => {
      console.log(res);
      // this.router.navigate(['/admin/dashboard']).then();
    });
  }

  getRandomImage() {
    this.form.get('checkKey').setValue(new Date().getTime());
    this.authSvc.randomImage(this.form.get('checkKey').value).subscribe(res => {
      this.randomImage = res.result;
    });
  }

}
