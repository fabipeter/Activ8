export interface IUserFormValues {
    username: string;
    password: string;
  }
  
  export class CustomerLoginFormValues {
    email: string ="";
    password: string ="";
  }

  export class CorporateLoginFormValues {
    registrationNumber: string ="";
    password: string ="";
  }

  export interface IValidOTP {
    username: string;
    otp: string;
  }


  export interface IRefreshToken {
    refreshToken: string;
  }

  export interface IIndividualRegistrationFormValues {
    id?: number;
    userName: string;
    fullName: string;
    accountName: string;
    workEmailAddress: string;
    bvn: string;
    isStaff:boolean;
    staffID: string;
    safAccountNumber: string;
    phoneNumber: string;
    emailAddress: string;
    maritalStatus: string;
    spouseName: string;
    spousePhoneNumber: string;
    residentialAddress: string;
    password: string;
    confirmPassword: string;
    typeOfResidence: string;
    lengthOfStayCurrentResident: string;
    typeOfIdentification: string;
    identificationNumber: string;
    expiryDate?: Date;
    nextOfKinName: string;
    nextOfKinAddress: string;
    nextOfKinPhoneNumber: string;
    nextOfKinRelationship: string;
    domicileBank: string;
    salaryAccount: string;
    salaryPaymentDate?: Date;
    monthlySalary: string;
    periodOfEmployement: string;
    statusOfEmployment: string;
    profileComplete: boolean;
    modifiedDate?: Date;
    modifiedBy: string;
    createdBy: string;
    createdDate?: Date;
  }
  
  export class IndividualRegistrationFormValues {
    bvn: string = "";
    tin: string = "";
    isStaff:boolean = false;
    staffId: string = "";
    safAccountNumber: string = "";
    email: string = "";
    password: string = "";
    confirmPassword: string = "";
    accountType : number = 0;
  }

    export class CustomerRegistrationFormValues {
      bvn: string = "";
      tin: string = "";
      isStaff:boolean = false;
      staffId: string = "";
      safAccountNumber: string = "";
      email: string = "";
      password: string = "";
      confirmPassword: string = "";
      accountType : number = 0;
    }

  export class CustomerUpdateAccountFormValues {
    password: string = "";
    email: string = "";    
  }
  
  export class Individual {
    id?: number;
    userName: string = "";
    fullName: string = "";
    accountName: string = "";
    workEmailAddress: string = "";
    bvn: string = "";
    isStaff:boolean = false;
    staffID: string = "";
    safAccountNumber: string = "";
    phoneNumber: string = "";
    emailAddress: string = "";
    maritalStatus: string = "";
    spouseName: string = "";
    spousePhoneNumber: string = "";
    residentialAddress: string = "";
    password: string = "";
    confirmPassword: string = "";
    typeOfResidence: string = "";
    lengthOfStayCurrentResident: string = "";
    typeOfIdentification: string = "";
    identificationNumber: string = "";
    expiryDate?: Date;
    nextOfKinName: string = "";
    nextOfKinAddress: string = "";
    nextOfKinPhoneNumber: string = "";
    nextOfKinRelationship: string = "";
    domicileBank: string = "";
    salaryAccount: string = "";
    salaryPaymentDate?: Date;
    monthlySalary: string = "";
    periodOfEmployement: string = "";
    statusOfEmployment: string = "";
    profileComplete: boolean = false;
    modifiedDate?: Date;
    modifiedBy: string = "";
    createdBy: string = "";
    createdDate?: Date;
  }


  export class CorporateRegistrationFormValues {
    bvn: string = "";
    tin: string = "";
    isStaff:boolean = false;
    staffId: string = "";
    safAccountNumber: string = "";
    email: string = "";
    password: string = "";
    confirmPassword: string = "";
    accountType : number = 0;
  }