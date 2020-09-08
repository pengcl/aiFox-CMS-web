import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';

@Injectable({providedIn: 'root'})
export class JobService {

  constructor(private http: HttpClient) {
  }

  list(): Observable<any> {
    return this.http.get('api/jobs');
  }

  item(id): Observable<any> {
    return this.http.get('api/jobs/' + id);
  }

  post(body): Observable<any> {
    return this.http.post('api/jobs', body);
  }

  put(id, body): Observable<any> {
    return this.http.put('api/jobs/' + id, body);
  }

  delete(id): Observable<any> {
    return this.http.delete('api/jobs/' + id);
  }

  count(): Observable<any> {
    return this.http.get('api/jobs/count');
  }
}
