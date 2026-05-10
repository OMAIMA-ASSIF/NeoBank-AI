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
