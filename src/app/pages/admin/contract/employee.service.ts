import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';

@Injectable({providedIn: 'root'})
export class ContractService {

  constructor(private http: HttpClient) {
  }

  list(): Observable<any> {
    return this.http.get('api/contracts');
  }

  item(id): Observable<any> {
    return this.http.get('api/contracts/' + id);
  }

  count(): Observable<any> {
    return this.http.get('api/contracts/count');
  }
}
