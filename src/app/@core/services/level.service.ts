import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({providedIn: 'root'})
export class LevelService {

  constructor(private http: HttpClient) {
  }

  list(): Observable<any> {
    return this.http.get('api/levels');
  }

  item(id): Observable<any> {
    return this.http.get('api/levels/' + id);
  }

  count(): Observable<any> {
    return this.http.get('api/levels/count');
  }
}
