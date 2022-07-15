import { Observable } from 'rxjs';
import { AppState } from './../../state/app-state';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { Store } from '@ngrx/store';

import * as customerActions from "../state/customer.action";
import * as fromCustomer from "../state/customer.reducer";
import {Customer} from "../customer.model";

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.css']
})
export class CustomerEditComponent implements OnInit {
  customerForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private store: Store<fromCustomer.AppState>
  ) { }

  ngOnInit() {
    this.customerForm = this.fb.group({
      id: null,
      name: ["", Validators.required],
      phone: ["", Validators.required],
      address: ["", Validators.required],
      membership: ["", Validators.required],
    })
  
    const customer$: Observable<Customer | undefined> = this.store.select(
      fromCustomer.getCurrentCustomer
    )

    customer$.subscribe(currentCustomer => {
      if (currentCustomer) {
        this.customerForm.patchValue({
          id: currentCustomer.id,
          name: currentCustomer.name,
          phone: currentCustomer.phone,
          address: currentCustomer.address,
          membership: currentCustomer.membership,
        });
      }
    })
  }

  updateCustomer() {
    const updatedCustomer: Customer = {
      name: this.customerForm.get("name")?.value,
      phone: this.customerForm.get("phone")?.value,
      address: this.customerForm.get("address")?.value,
      membership: this.customerForm.get("membership")?.value,
      id: this.customerForm.get("id")?.value
    };

    this.store.dispatch(new customerActions.UpdateCustomer(updatedCustomer))
  }

}
