import { Component , OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from '../model/customer.model';
import jsonPipe from '@angular/common/locales/en';
import { JsonPipe } from '@angular/common';
import {CommonModule} from '@angular/common';
import { AccountService } from '../services/account-service';
import { catchError, Observable, throwError } from 'rxjs';
import { Account, AccountDetails } from '../model/account.model';

@Component({
  selector: 'app-customer-accounts',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './customer-accounts.html',
  styleUrl: './customer-accounts.css',
})
export class CustomerAccounts implements OnInit {
  accounts$!: Observable<Account[]>;
  errorMessage!: string;
  customer!: Customer;         // client passé via l'état de navigation
  customerId!: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService
  ) {

    const navigation = this.router.getCurrentNavigation();
    this.customer = navigation?.extras?.state as Customer;
  }

  ngOnInit(): void {
    this.customerId = +this.route.snapshot.params['id'];
    this.fetchAccounts();
  }

  fetchAccounts(): void {
    this.accounts$ = this.accountService.getCustomerAccounts(this.customerId).pipe(
      catchError(err => {
        this.errorMessage = err.message;
        return throwError(err);
      })
    );
  }

  goBack(): void {
    this.router.navigate(['/customers']); // retour à la liste des clients
  }
}
