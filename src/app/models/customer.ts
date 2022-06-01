
export interface ICustomer{
    userID:number;
    emailAddress:string;
    phoneNumber:string;
    // fullName:string;
    password:string;
    referralCode:string;
    firstName:string;
    lastName:string;
    middleName:string;
    dateOfBirth:string;
    gender:string;
    nationality:string;
    stateOfOrigin: string;
    maritalStatus: string;
    nin: string;
    residentialAddress: string;
    watchListed: string;
    enrollmentBank: string;
    enrollmentBranch: string;
    isBvnVerified: boolean;
    bvn: string;
    userStatusId?: number;
    isSecurityQuestionSetUp: boolean;
    hasRequestedCard: boolean;
    dateOfRegistration: Date;
    dateModified: Date;
    credit: number;
    balance: number;
    modifiedBy: string;
    securityQuestionId: number;
    securityQuestionAnswer: string;
    subscriptionType: number;
}

export class CustomerRegistrationFormValues {
  username: string = "";
  bvn: string = "";
  tin: string = "";
  isStaff:boolean = false;
  staffId: string = "";
  safAccountNumber: string = "";
  email: string = "";
  accountType : number = 0;
}

export class CustomerRegistrationForm {
  username: string = "";
  registrationNUmber: string = "";
  tin: string = "";
  isStaff:boolean = false;
  staffId: string = "";
  safAccountNumber: string = "";
  email: string = "";
  password: string = "";
  confirmPassword: string = "";
  accountType : number = 0;
}

export class Customer{
  userID:number=0;
  emailAddress: string="";
  phoneNumber: string="";
  password: string="";
  referralCode: string="";
  // fullName: string="";
  firstName: string="";
  lastName: string="";
  middleName: string="";
  dateOfBirth: string="";
  gender: string="";
  nationality: string="";
  stateOfOrigin: string="";
  maritalStatus: string="";
  nin: string="";
  residentialAddress: string="";
  watchListed: string="";
  enrollmentBank: string="";
  enrollmentBranch: string="";
  isBvnVerified: boolean=true;
  bvn: string="";
  userStatusId?: number;
  isSecurityQuestionSetUp:boolean= true;
  hasRequestedCard:boolean= true;
  dateOfRegistration: Date = new Date();
  dateModified?: Date;
  credit: number=0;
  balance: number=0;
  modifiedBy: string="";
  securityQuestionId: number =0;
  securityQuestionAnswer: string="";
  subscriptionType?: number;
}

export class CustomersList{
  list: Customer[]=[];
}

export class SubscriptionDropDownOption {
    key: string ="";
    text: string ="";
    value: number = 0;


  }
export class SecurityQuestion{
    id:number=0;
    questions:string='';
}

  export interface ICustomerTransaction{
    id:number;
    transactionDate:Date;
    valueDate:Date;
    reference:string;
    debits:string;
    credits:string;
    balance:string;
    channel:string;
    transactionId:string;
    // accountName:string;
    // accountNumber:string;
}


