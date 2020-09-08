import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';

@Injectable({providedIn: 'root'})
export class SupplierService {

  constructor(private http: HttpClient) {
  }

  list(): Observable<any> {
    return this.http.get('api/suppliers');
  }

  item(id): Observable<any> {
    return this.http.get('api/suppliers/' + id);
  }

  find(body): Observable<any> {
    return this.http.get('api/suppliers', {params: body});
  }

  count(): Observable<any> {
    return this.http.get('api/suppliers/count');
  }
}
