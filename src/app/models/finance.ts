export class CategoryDropDownOption {
    key: string ="";
    text: string ="";
    value?: number;
  }


export interface IFinance{
    id:number;
    companyName:string;
    agreedAmount:number;
    phoneNumber:string;
    emailAddress:string;
}

export interface IBVNVerifiedResponse{
    responseCode: string;
    bvn: string;
    firstName: string;
    middleName: string;
    lastName: string;
    dateOfBirth: string;
    phoneNumber: string;
    registrationDate: string;
    enrollmentBank: string;
    enrollmentBranch: string;
    email: string;
    gender: string;
    phoneNumber2: string;
    levelOfAccount: string;
    lgaOfOrigin: string;
    lgaOfResidence: string;
    maritalStatus: string;
    nin: string;
    nameOnCard: string;
    nationality: string;
    residentialAddress: string;
    stateOfOrigin: string;
    stateOfResidence: string;
    title: string;
    otp: string;
    accT_TYPE: string;
    watchListed: string;
    base64Image: string
}

export interface ICategory{
    id: number;
    name: string;
  }

export class FinanceFormValues{
    id:number = 0;
    companyName:string ="";
    emailAddress:string ="";
    address:string = "";
    phoneNumber:string ="";
    registrationNumber:string="";
    agreedAmount:number=0;
    accountName:string ="";
    accountNumber:string = "";
    category:number = 0;
    thumbnail:string = "";
    status:boolean =false;
    subscriptionType:number =0;
    dateJoined:Date = new Date();
    createdBy:string ="";
}


export class FinanceRegForm{
  id:number = 0;  
  bvn:string="";
  stallLocation:string ="";
  stallId:number =0;
  stallTypeId:number =0;
  noOfUnits:number=0;
  allocationNumber:string="";
  rentalRate:number =0;
  accountNumber:string = "";
  amount:number = 0;
  tenor:number =0;
  monthlyTurnover:string="";
  securityDeposit:number = 0;
  cashCollateral:number =0; 
  accountStatementStatus:string="";
  acccountName:string =""
  accountStatementBank:string ="";
  allocationLetter:string ="";
  proofOfTradingYears:string ="";
  statementOfAccount:string ="";
  referenceLetter:string ="";
  boardResolution:string ="";
  
}

export class CreateFinance{
    location: string="";
    customerUserName:string = '';
    stallId:number = 0;
    stallTypeId:number=0;
    unit:number = 0;
    allocationNumber:string="";
    amount:number = 0;
    tenor:number = 0;
    userName:string = '';
    securityDeposit:number = 0;
    cashCollateral:number = 0;
  }


 

  export class StallTypeType{
      type:string="";
      value:string = "";
  }

  export class TenorInMonths{
      tenorInMonths:string ="";      
  }

  
  export class StallType{
    name:string = "";
    types: StallTypeType[] = [];
    tenorInMonths: TenorInMonths[] = [];
    rentalRate:string ="";
    staffSecurityDeposit:string = "";
    customerSecurityDeposit:string = "";
    staffCashCollateral:string = "";
    customerCashCollateral:string = "";
    centralLedgerAccountName:string = "";
    centralLedgerAccountNumber:string = "";

  }

  export class Stall{      
    location:string ="";
    stallTypes:StallType[] =[];
  }


  export class StallForm{
    stallDetails: Stall  = new Stall();
  }

  export class DocumentFiles{
    RequestId:number = 0;
    AllocationLetter:string = "";
    TradingYears:string = "";
    StateOfAccount:string = "";
    ReferenceLetter:string = "";
    BoardResolution:string = "";
  }







