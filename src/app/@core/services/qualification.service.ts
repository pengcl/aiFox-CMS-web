import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({providedIn: 'root'})
export class QualificationService {

  constructor(private http: HttpClient) {
  }

  list(): Observable<any> {
    return this.http.get('api/qualifications');
  }

  item(id): Observable<any> {
    return this.http.get('api/qualifications/' + id);
  }

  count(): Observable<any> {
    return this.http.get('api/qualifications/count');
  }
}
