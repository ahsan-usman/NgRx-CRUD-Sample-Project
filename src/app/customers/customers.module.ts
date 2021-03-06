import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerComponent } from './customer/customer.component';
import { CustomerAddComponent } from './customer-add/customer-add.component';
import { CustomerEditComponent } from './customer-edit/customer-edit.component';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { RouterModule, Routes} from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import {customerReducer} from "./state/customer.reducer";
import { HttpClientModule } from '@angular/common/http';

import { EffectsModule,Actions } from '@ngrx/effects';
import { CustomerEffect } from './state/customer.effects';
 
const customerRoutes: Routes = [{path:"", component: CustomerComponent}];

@NgModule({
  declarations: [
    CustomerComponent,
    CustomerAddComponent,
    CustomerEditComponent,
    CustomerListComponent
  ],
  imports: [
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    EffectsModule.forFeature([CustomerEffect]),
    StoreModule.forFeature("customers", customerReducer),
    CommonModule,
    RouterModule.forChild(customerRoutes)
  ]
})
export class CustomersModule { }
