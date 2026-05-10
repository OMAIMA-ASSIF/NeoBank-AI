import { Component ,OnInit} from '@angular/core';
import { FormBuilder, FormGroup} from '@angular/forms';
import { AccountService } from '../services/account-service';
import { Observable } from 'rxjs';
import { AccountDetails } from '../model/account.model';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

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

  constructor(private fb : FormBuilder, private accountService : AccountService) {}
  ngOnInit(): void {
    this.accountFormGroup = this.fb.group({
      accountId : this.fb.control(''),
    });
  }

  handleSearchAccount() {
    let accountId : string = this.accountFormGroup.value.accountId;
    this.accountObservable = this.accountService.getAccount(accountId, this.currentPage, this.pageSize);
  }

}
