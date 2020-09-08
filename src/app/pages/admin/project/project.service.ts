import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';

@Injectable({providedIn: 'root'})
export class ProjectService {

  constructor(private http: HttpClient) {
  }

  list(): Observable<any> {
    return this.http.get('api/projects');
  }

  item(id): Observable<any> {
    return this.http.get('api/projects/' + id);
  }

  find(body): Observable<any> {
    return this.http.get('api/projects', {params: body});
  }

  count(): Observable<any> {
    return this.http.get('api/projects/count');
  }

  employees(): Observable<any> {
    return this.http.get('api/employees');
  }
}
