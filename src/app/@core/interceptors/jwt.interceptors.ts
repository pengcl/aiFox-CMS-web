import {Inject, Injectable} from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthService} from '../../pages/auth/auth.service';

const API_WHITE_LIST = ['sys/login', 'sys/permission/getUserPermissionByToken', 'sys/randomImage'];

@Injectable()
export class JwtInterceptors implements HttpInterceptor {
  constructor(@Inject('PREFIX_URL') private PREFIX_URL, private authSvc: AuthService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this.isInWhiteList(req.url)) {
      /*const JWT = {
        Authorization: 'Bearer ' + this.authSvc.token().jwt
      };*/
      const TOKEN = {
        'X-Access-Token': this.authSvc.token() ? this.authSvc.token().jwt : ''
      };
      req = req.clone({
        setHeaders: TOKEN
      });
    }
    return next.handle(req);
  }

  // 查询当前请求是否在白名单
  isInWhiteList(url) {
    let inWhiteList = false;
    API_WHITE_LIST.forEach((marchContent) => {
      if (url.indexOf(marchContent) !== -1) {
        inWhiteList = true;
      }
    });
    return inWhiteList;
  }

  /*intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const JWT = `Bearer ` + this.authSvc.token().jwt;
    console.log(JWT);
    req = req.clone({
      setHeaders: {
        Authorization: JWT
      }
    });
    return next.handle(req);
  }*/

}
