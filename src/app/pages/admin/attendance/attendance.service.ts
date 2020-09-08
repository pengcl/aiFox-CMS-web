import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';

@Injectable({providedIn: 'root'})
export class AttendanceService {

  constructor(private http: HttpClient) {
  }

  list(): Observable<any> {
    return this.http.get('api/attendances');
  }

  item(id): Observable<any> {
    return this.http.get('api/attendances/' + id);
  }

  find(params): Observable<any> {
    return this.http.get('api/attendances', {params: params});
  }

  count(): Observable<any> {
    return this.http.get('api/attendances/count');
  }
}
