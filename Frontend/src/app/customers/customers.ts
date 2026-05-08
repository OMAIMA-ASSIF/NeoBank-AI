import { Component, OnInit } from '@angular/core';
import {CommonModule} from '@angular/common';
import {Customer} from '../services/customer';

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [ CommonModule],
  templateUrl: './customers.html',
  styleUrl: './customers.css'

})
export class Customers implements OnInit {
  customers : any;
  constructor(private customerService: Customer) { }

  ngOnInit(): void {
    this.customerService.getCustomers(). subscribe({
      next: (data) => {
        this.customers = data;
      },
      error: (error) => {
        console.error('Error fetching customers:', error);
      }
    });
  }
}
