import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable, Subject, of as observableOf} from 'rxjs';
import {mergeMap as observableMargeMap} from 'rxjs/operators';

import {StorageService} from '../../@core/services/storage.service';

@Injectable({providedIn: 'root'})
export class AuthService {
  public loginRedirectUrl: string;
  private loginStatus = new Subject<boolean>();

  constructor(@Inject('PREFIX_URL') private PREFIX_URL,
              private http: HttpClient,
              private router: Router,
              private storage: StorageService) {
  }

  requestAuth() {
    if (this.router.url.indexOf('auth') !== -1) {
      return false;
    }
    if (this.loginRedirectUrl) {
      return false;
    }

    this.loginRedirectUrl = this.router.url;
    this.router.navigate(['/pages/auth']);
  }

  login(body): Observable<any> {
    return this.http.post(this.PREFIX_URL + 'sys/login', body);
  }

  permissions(token): Observable<any> {
    return this.http.get(this.PREFIX_URL + 'sys/permission/getUserPermissionByToken', {params: {token}});
  }

  randomImage(currDatetime): Observable<any> {
    return this.http.get(this.PREFIX_URL + 'sys/randomImage/' + currDatetime, {});
  }

  users(): Observable<any> {
    return this.http.get('api/users');
  }

  token(token?) {
    if (token) {
      this.storage.set('token', JSON.stringify(token));
    } else if (token === null) {
      this.storage.remove('token');
    } else {
      const TOKEN = this.storage.get('token');
      if (TOKEN) {
        return JSON.parse(TOKEN);
      } else {
        return '';
      }
    }
  }

  get currentUser() {
    const token = this.storage.get('token');
    return JSON.parse(token).user;
  }

  get isLogged(): boolean {
    this.loginStatus.next(!!this.currentUser);
    return !!this.currentUser;
  }

  getLoginStatus(): Observable<boolean> {
    return this.loginStatus.asObservable();
  }

  updateLoginStatus(token) {
    this.storage.set('token', JSON.stringify(token));
    this.loginStatus.next(this.isLogged);
  }

  logout(token): Observable<any> {
    return this.http.post(this.PREFIX_URL + `/sys/logout`, {}, {headers: {'X-Access-Token': token}})
    .pipe(observableMargeMap((res: any) => {
      this.storage.remove('token');
      return observableOf(res);
    }));
  }

  /*logout() {
    this.storage.remove('token');
    this.router.navigate(['/auth']);
  }*/
}
