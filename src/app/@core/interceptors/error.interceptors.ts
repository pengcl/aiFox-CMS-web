import {Injectable} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';

import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {ToastService} from '../modules/toast';
import {DialogService} from '../modules/dialog';
import {AuthService} from '../../pages/auth/auth.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private toastSvc: ToastService, private dialogSvc: DialogService, private authSvc: AuthService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(req).pipe(tap(
      res => this.handleResponse(res, req, next),
      err => this.handleResponse(err, req, next)
    ));
  }

  private handleResponse(res: any, req, next): void {
    if (res.status === 0) {
      this.toastSvc.hide();
      this.dialogSvc.destroyAll();
      this.dialogSvc.show({
        content: '无法链接服务器',
        cancel: '',
        confirm: '我知道了'
      }).subscribe();
    } else {
      if (res.body) {
        if (res.body.code !== 0 && res.body.code !== 200) {
          this.toastSvc.hide();
          this.dialogSvc.destroyAll();
          this.dialogSvc.show({
            content: res.body.message,
            cancel: '',
            confirm: '我知道了'
          }).subscribe();
          /*if (req.url.indexOf('MenuList') === -1) {
            if (res.body.StatusCode === 401 || res.body.StatusCode === 403 || res.body.StatusCode === 411) {
              this.dialogSvc.show({
                content: res.body.Info,
                cancel: '',
                confirm: '我知道了',
              }).subscribe(() => {
                this.authSvc.requestAuth();
              });
            } else {
              if (res.body.Info) {
                this.dialogSvc.show({
                  content: res.body.Info,
                  cancel: '',
                  confirm: '我知道了'
                }).subscribe();
              }
            }
          }*/
        }
      }
    }
  }
}
