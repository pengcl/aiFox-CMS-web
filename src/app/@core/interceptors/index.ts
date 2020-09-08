import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {JwtInterceptors} from './jwt.interceptors';

export const INTERCEPTORS = [
  {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptors, multi: true}
];
