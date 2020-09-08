import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';

@Injectable({providedIn: 'root'})
export class PostService {

  constructor(private http: HttpClient) {
  }

  list(): Observable<any> {
    return this.http.get('api/posts');
  }

  item(id): Observable<any> {
    return this.http.get('api/posts/' + id);
  }

  count(): Observable<any> {
    return this.http.get('api/posts/count');
  }
}
