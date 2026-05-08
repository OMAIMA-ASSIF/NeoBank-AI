import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root', // This makes the service available throughout the application car il est disponible dans la root d app
})
export class Customer {
  constructor(private http: HttpClient) { }

  public getCustomers() : Observable<any> {
    return this.http.get('http://localhost:8085/customers');
  }
}
