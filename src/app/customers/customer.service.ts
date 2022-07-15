import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Customer } from "./customer.model";


@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private customerUrl = "http://localhost:3000/customers"

  constructor(private http: HttpClient) { }

  getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.customerUrl);
  }

  getCustomerById(payload: number): Observable<Customer> {
    return this.http.get<Customer>(`${this.customerUrl}/${payload}`);
  }

  createCustomer(payload: Customer): Observable<Customer> {
    return this.http.post<Customer>(this.customerUrl, payload);
  }

  updateCustomer(customer: Customer): Observable<Customer> {
    return this.http.patch<Customer>(
      `${this.customerUrl}/${customer.id}`,
      customer
    );
  }

  deleteCustomer(payload: number) {
    return this.http.delete(`${this.customerUrl}/${payload}`);
  }
}
