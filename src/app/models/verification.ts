export class SafAccountVerification{
    safAccountNumber:string='';
    email:string='';
    accountType:number = 0;
}

export class OTPRegVerification{
    email:string='';
    otp:string='';
}

export class BVNVerification{
    bvn:string='';
    // userName:string='';
}

export class DSRCheck{
    requestId: number = 0;
    location: string="";
    stallTypeId:number=0;
    rentalRate:number = 0;
    unit:number = 0;
    allocationNumber:string="";
    amount:number = 0;
    tenor:number = 0;
    monthlyTurnover:string=""
  }


  export class TenPercentCheck{
    requestId: number = 0;   
  }

 

