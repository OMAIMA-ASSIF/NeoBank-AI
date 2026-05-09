import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomerService } from '../services/customer';

@Component({
  selector: 'app-new-customer',
  imports: [ReactiveFormsModule],
  templateUrl: './new-customer.html',
  styleUrl: './new-customer.css',
})
export class NewCustomer implements OnInit{
  newCustomerFormGroup! : FormGroup;
  constructor(private fb : FormBuilder, private customerService : CustomerService){}

  ngOnInit() : void {
    this.newCustomerFormGroup = this.fb.group({
      name : this.fb.control(null, [Validators.required, Validators.minLength(4)]),
      email : this.fb.control(null, [Validators.required, Validators.email]),
    });
  }

  handleSaveCustomer() {
    let customer = this.newCustomerFormGroup.value;
    this.customerService.saveCustomer(customer).subscribe({
      next : (data) => {
        alert("Customer has been saved successfully !");
      },
      error : (err) => {
        console.log(err);
         alert("An error has occured while saving customer !");
      }
    })
  }

}
