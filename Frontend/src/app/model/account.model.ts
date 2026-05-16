export interface AccountDetails{
  accountId: string;
  balance: number;
  currentPage: number;
  totalPages: number;
  pageSize: number;
  accountOperationDTOList: accountOperationDTOList[];
}


export interface accountOperationDTOList{
  id: number;
  operationDate: Date;
  amount: number;
  type: string;
  description: string
}

export interface Account {
  type : string;
  id: string;
  balance : number;
  createdAt : string;
  status : string;
  overDraft?: number; // pour CurrentAccount
  interestRate?: number; // pour SavingAccount
}
