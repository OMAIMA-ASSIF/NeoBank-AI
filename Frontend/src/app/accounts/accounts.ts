import { Component ,OnInit} from '@angular/core';
import { FormBuilder, FormGroup} from '@angular/forms';
import { AccountService } from '../services/account-service';
import { catchError, Observable, throwError } from 'rxjs';
import { AccountDetails } from '../model/account.model';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import de from '@angular/common/locales/de';
import { AuthService } from '../services/auth-service';

@Component({
  selector: 'app-accounts',
  imports: [ ReactiveFormsModule, CommonModule],
  templateUrl: './accounts.html',
  styleUrl: './accounts.css',
  standalone : true

})
export class Accounts implements OnInit{
  accountFormGroup! : FormGroup;
  currentPage : number = 0;
  pageSize : number = 5;
  accountObservable! : Observable<AccountDetails>;
  operationFormGroup! : FormGroup;
  errorMessage! : string;

  constructor(private fb : FormBuilder, private accountService : AccountService, public authService : AuthService) {}
  ngOnInit(): void {
    this.accountFormGroup = this.fb.group({
      accountId : this.fb.control(''),
    });
      this.operationFormGroup = this.fb.group({
        operationType : this.fb.control(null),
        amount : this.fb.control(0),
        description : this.fb.control(null),
        accountDestination : this.fb.control(null)
      })
  }

  handleSearchAccount() {
    let accountId : string = this.accountFormGroup.value.accountId;
    this.accountObservable = this.accountService.getAccount(accountId, this.currentPage, this.pageSize).pipe
    (
      catchError(err => {
      this.errorMessage = err.message;
      return throwError(err);
      })
    );
  }

  gotoPage(page: number) {
    this.currentPage = page;
    this.handleSearchAccount(); // Refresh the account details for the new page
  }

  handleAccountOperation() {
    let accountId : string = this.accountFormGroup.value.accountId;
    let operationType : string = this.operationFormGroup.value.operationType;
    let amount : number = this.operationFormGroup.value.amount;
    let description : string = this.operationFormGroup.value.description;
    let accountDestination : string = this.operationFormGroup.value.accountDestination;
    //console.log('Account ID before debit:', accountId);
    if (operationType === 'DEBIT') {
      this.accountService.debit(accountId, amount, description).subscribe({
        next : (data) => {
          alert("Debit operation successful");
          this.handleSearchAccount(); // Refresh the account details after the operation
          this.operationFormGroup.reset();
        },
        error : (err) => {
          alert("Error during debit operation: " + err.message);
          console.error("Debit operation error:", err);
        }
      });
    }else if (operationType === 'CREDIT') {
      this.accountService.credit(accountId, amount, description).subscribe({
        next : (data) => {
          alert("Credit operation successful");
          this.handleSearchAccount(); // Refresh the account details after the operation
          this.operationFormGroup.reset();
        },
        error : (err) => {
          alert("Error during credit operation: " + err.message);
          console.error("Credit operation error:", err);
        }
      });

    }else if (operationType === 'TRANSFER') {
      this.accountService.transfer(accountId, accountDestination, amount, description).subscribe({
        next : (data) => {
          alert("Transfer operation successful");
          this.handleSearchAccount(); // Refresh the account details after the operation
          this.operationFormGroup.reset();
        },
        error : (err) => {
          alert("Error during transfer operation: " + err.message);
          console.error("Transfer operation error:", err);
        }
      });
    }

  }




}
