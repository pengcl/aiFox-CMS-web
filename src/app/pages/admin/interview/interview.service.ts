import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';

@Injectable({providedIn: 'root'})
export class InterviewService {

  constructor(private http: HttpClient) {
  }

  list(): Observable<any> {
    return this.http.get('api/interviews');
  }

  item(id): Observable<any> {
    return this.http.get('api/interviews/' + id);
  }

  find(employee): Observable<any> {
    return this.http.get('api/interviews?employee=' + employee);
  }

  count(): Observable<any> {
    return this.http.get('api/interviews/count');
  }
}
