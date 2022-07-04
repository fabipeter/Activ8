export class GeneratedCoupons {
  coupons: Coupon[] = [];
}

export class Coupon {
  id: number = 0;
  companyRegistrationNumber: string = "";
  coupon: string = "";
  couponIdentitycode: string = "";
  dateCreated: Date = new Date();
  createdBy: string = "";
  userId: number = 0;
  isUsed: boolean = false;
}
