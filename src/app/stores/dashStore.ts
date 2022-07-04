import { action, makeAutoObservable, observable, runInAction } from "mobx";
import { toast } from "react-toastify";
import agent from "../api/agent";
import { RootStore } from "./rootStore";
import { FinanceRegForm, IBVNVerifiedResponse } from "../models/finance";
import { v4 as uuidv4 } from "uuid";
import { Coupon, GeneratedCoupons } from "../models/coupon";

export default class DashStore {
  rootStore: RootStore;
  dropDown: string[] = [];
  identityCodeList: string[] = [];
  // generatedCouponList: GeneratedCoupons[] = [];
  generatedCouponList: Coupon[] = [];
  // marketTenorList: TenorInMonthsID[] = [];
  constructor(rootStore: RootStore) {
    // update mobx lite to read observables
    makeAutoObservable(this);

    this.rootStore = rootStore;
  }

  @observable open = false;
  @observable couponStatus = "";
  @observable couponActivatedStatus: string = "";
  @observable bvnVerifiedResponse: IBVNVerifiedResponse | null = null;
  @observable createFinanceResponse: any;
  // @observable submitting = "default";
  // @observable productDetailsArray: IProduct[] = [];
  // @observable productCouponUpdate: ProductCouponObject = new ProductCouponObject();
  // @observable subscriptionOptions: SubscriptionDropDownOption[]  = [];

  @action setStatus = (x: string) => {
    this.couponStatus = x;
  };
  @action setActivatedStatus = (x: string) => {
    this.couponActivatedStatus = x;
  };
  @action setOpen = (x: boolean) => {
    this.open = x;
  };

  @action generateCoupon = async (couponNumber: number) => {
    try {
      runInAction(() => {
        this.couponActivatedStatus = "loading";
      });

      const request = {
        howmanyCoupon: couponNumber,
        couponIdentitycode: uuidv4(),
      };

      const response = await agent.Coupon.generate_coupons(request);
    //   console.log(response);
      if (response.isSuccess) {
        runInAction(() => {
          this.couponActivatedStatus = "success";
        });
      } else {
        runInAction(() => {
          this.couponActivatedStatus = "failure";
        });
        toast.error("Problem Submitting data");
      }
    } catch (error) {
      runInAction(() => {
        this.couponActivatedStatus = "failure";
      });
      // toast.error("Problem Submitting data");
      throw error;
    }
  };

  @action validateCoupon = async (couponCode: string) => {
    try {
      runInAction(() => {
        this.couponActivatedStatus = "loading";
      });
      const request = {
        coupon: couponCode,
        userId: "",
      };

      const response = await agent.Coupon.use_coupon_against_user(request);
      //   console.log(response);
      if (response.isSuccess) {
        runInAction(() => {
          this.couponActivatedStatus = "success";
        });
      } else {
        runInAction(() => {
          this.couponActivatedStatus = "failure";
        });
        toast.error("Invalid Coupon");
      }
    } catch (error) {
      runInAction(() => {
        this.couponActivatedStatus = "failure";
      });
      // toast.error("Problem Submitting data");
      throw error;
    }
  };

  @action getGeneratedList = async () => {
    runInAction(() => {
      this.couponStatus = "loading";
    });

    try {
      const response = await agent.Coupon.list_generated_coupon();
      // console.log(response.record);

      if (response.isSuccess) {
        runInAction(() => {
          this.generatedCouponList = response.record;
          if (this.generatedCouponList.length > 0) {
            this.generatedCouponList.map((coupon, index) => {
              return this.dropDown.push(coupon.couponIdentitycode);
            });
          }

          this.identityCodeList = this.dropDown.filter((drop, index) => {
            return this.dropDown.indexOf(drop) === index;
          });

          this.couponStatus = "success";
        });
        // console.log(response);
        // return response.response;
      } else {
        runInAction(() => {
          this.couponStatus = "failure";
        });
        // toast.error("");
      }
    } catch (error) {
      runInAction(() => {
        this.couponStatus = "failure";
      });
      toast.error("Couldn't Fetch Data");

      throw error;
    }
  };
}
