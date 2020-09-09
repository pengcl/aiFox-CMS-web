import {Injectable} from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthService} from '../../pages/auth/auth.service';

const API_WHITE_LIST = [];

@Injectable()
export class JwtInterceptors implements HttpInterceptor {
  constructor(private authSvc: AuthService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (API_WHITE_LIST.indexOf(req.url) === -1) {
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
