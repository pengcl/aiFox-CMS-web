import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';

@Injectable({providedIn: 'root'})
export class DepartmentService {

  constructor(private http: HttpClient) {
  }

  list(): Observable<any> {
    return this.http.get('api/departments');
  }

  item(id): Observable<any> {
    return this.http.get('api/departments/' + id);
  }

  count(): Observable<any> {
    return this.http.get('api/departments/count');
  }
}
