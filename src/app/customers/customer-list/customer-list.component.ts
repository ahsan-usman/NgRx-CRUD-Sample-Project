import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from "@ngrx/store";


import * as customerActions from "../state/customer.action";
import * as fromCustomer from "../state/customer.reducer";
import { Customer } from "../customer.model";

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {

  customers$?: Observable <Customer[]>;
  error$?: Observable<String>;

  constructor(private store: Store<fromCustomer.AppState>) { }

  ngOnInit(){
    this.store.dispatch(new customerActions.LoadCustomers());
    this.customers$ = this.store.pipe(select(fromCustomer.getCustomers ))
    this.error$ = this.store.pipe(select(fromCustomer.getError))
  }


  DeleteCustomer(customer: Customer) {
    if(confirm("Are you sure you want to delete the user?")){
      this.store.dispatch(new customerActions.DeleteCustomer(customer.id as any))
    }
  }

  editCustomer(customer: Customer) {
    this.store.dispatch(new customerActions.LoadCustomer(customer.id as any))
  }

}
