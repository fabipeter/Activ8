import { action, makeAutoObservable, observable, runInAction } from "mobx";
import { toast } from "react-toastify";
import agent from "../api/agent";
import { RootStore } from "./rootStore";
import * as XLSX from 'xlsx'
import jwt_decode from "jwt-decode";
import { FinanceRegForm, IBVNVerifiedResponse } from "../models/finance";

export default class CouponStore{
    rootStore: RootStore;
  
    constructor(rootStore: RootStore) {
      // update mobx lite to read observables
      makeAutoObservable(this);
  
      this.rootStore = rootStore;
    }



    @observable open = false;
    @observable financeStatus = "default";
    @observable couponActivatedStatus = "";
    @observable bvnVerifiedResponse: IBVNVerifiedResponse |null = null ;
    @observable createFinanceResponse: any ;
    // @observable productForm: ProductCouponObject = new ProductCouponObject();
    // @observable productUpdate: ProductCouponObject = new ProductCouponObject();
    // @observable submitting = "default";
    // @observable productDetailsArray: IProduct[] = [];
    // @observable productCouponUpdate: ProductCouponObject = new ProductCouponObject();
    // @observable subscriptionOptions: SubscriptionDropDownOption[]  = [];
  
    @action setStatus = (x: string) => {
      this.financeStatus = x;
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
          couponNumber: couponNumber,
        };


        setTimeout(() => {
          this.setActivatedStatus("");
        }, 4000);
  
        // const response = await agent.Coupon.generate_coupons(request);
        // if (response.message === "Successful") {
          
        //   runInAction(() => {
        //     this.couponActivatedStatus = "success";
        //   });
        // } else {
          
        //   runInAction(() => {
        //     this.couponActivatedStatus = "failure";
        //   });
        //   toast.error("Problem Submitting data");
        // }
      } catch (error) {      
          
          runInAction(() => {
            this.couponActivatedStatus = "failure";
          });
        // toast.error("Problem Submitting data");
        throw error;
      }
    };


    @action verifyBVN = async (values:FinanceRegForm) => {
      runInAction(() => {
        this.financeStatus = "loading";
      });

      const request= {
        bvn:values.bvn,
        // userName:"Fabirpe"
      }
      try {
         const response = await agent.Verification.verify_bvn(request);
          // console.log(response);
  
          if (response.response) {
            runInAction(() => {              
              this.bvnVerifiedResponse = response.response
              this.financeStatus = "success";
            });
            // console.log(response);
            return this.financeStatus;
          } else {
            runInAction(() => {
              this.financeStatus = "failure";
            });
            toast.error("Problem Verifying details");
            
          }
      } catch (error) {
        runInAction(() => {
          this.financeStatus = "failure";
        });
        // toast.error("Invalid Account Details");
        throw error;

      }
    };


    @action creditCheck = async () => {
      runInAction(() => {
        this.couponActivatedStatus = "loading";
      });

      
      try {
        
         const response = await agent.Verification.credit_check();
          // console.log(response);
  
          if (response.response) {
            runInAction(() => {              
              this.couponActivatedStatus = "success";
            });
            // console.log(response);
            return response.response;
          } else {
            runInAction(() => {
              this.couponActivatedStatus = "failure";
            });
            toast.error("Could not verify Credit");
            
          }
      } catch (error) {
        runInAction(() => {
          this.couponActivatedStatus = "failure";
        });
        // toast.error("Invalid Account Details");
        toast.error("Could not verify Credit");
        throw error;
        

      }
    };
  

    @action corporateCreditCheck = async () => {
      runInAction(() => {
        this.couponActivatedStatus = "loading";
      });

      
      try {
         const response = await agent.Verification.corporate_credit_check();
          // console.log(response);
  
          if (response.response) {
            runInAction(() => {              
              this.couponActivatedStatus = "success";
            });
            // console.log(response);
            return response.response;
          } else {
            runInAction(() => {
              this.couponActivatedStatus = "failure";
            });
            toast.error("Could not verify Credit");
            
          }
      } catch (error) {
        runInAction(() => {
          this.couponActivatedStatus = "failure";
        });
        // toast.error("Invalid Account Details");
        toast.error("Could not verify Credit");
        throw error;
        

      }
    };

    @action dsrCheck = async (values:FinanceRegForm) => {
      runInAction(() => {
        this.couponActivatedStatus = "loading";
      });

      const request = {
        requestId: this.createFinanceResponse.id,
        location: values.stallLocation,
        stallTypeId:values.stallTypeId,
        rentalRate:values.rentalRate,
        unit: values.noOfUnits,
        allocationNumber:values.allocationNumber,
        amount:values.amount,
        tenor:values.tenor,
        monthlyTurnover:values.monthlyTurnover
      }

      
      try {
         const response = await agent.Verification.dsr_check(request);
          // console.log(response);
  
          if (response.message === "Eligible") {
            runInAction(() => {              
              this.couponActivatedStatus = "success";
            });
            // console.log(response);
            return response.response;
          } else {
            runInAction(() => {
              this.couponActivatedStatus = "failure";
            });
            toast.info("You're Inelligible");
            
          }
      } catch (error) {
        runInAction(() => {
          this.couponActivatedStatus = "failure";
        });
        // toast.error("Invalid Account Details");
        toast.error("Could not verify DSR");
        throw error;
        

      }
    };

    @action tenPercentCheck = async (values:FinanceRegForm) => {
      runInAction(() => {
        this.couponActivatedStatus = "loading";
      });

      const request = {
        requestId: this.createFinanceResponse.id,
        
      }

      
      try {
         const response = await agent.Verification.ten_percent_check(request);
          // console.log(response);
  
          if (response.message === "Eligible") {
            runInAction(() => {              
              this.couponActivatedStatus = "success";
            });
            // console.log(response);
            return response.response;
          } else {
            runInAction(() => {
              this.couponActivatedStatus = "failure";
            });
            toast.error("Insufficient Funds");
            
          }
      } catch (error) {
        runInAction(() => {
          this.couponActivatedStatus = "failure";
        });
        // toast.error("Invalid Account Details");
        toast.error("Could not verify Account Details");
        throw error;
        

      }
    };


    @action loadAllStalls = async () => {
      runInAction(() => {
        this.couponActivatedStatus = "loading";
      });
      try {
        // const customerResponse = await agent.Customer.getRegisteredCustomer(paramID);

        // const subscriptionResponse = await agent.Subscription.getAllSubscriptionTypes();
        // const questions = await agent.Customer.getSecurityQuestions();
        setTimeout(() => {
          this.setActivatedStatus("default");
        }, 5000);

        
        runInAction(() => {
          // this.categoryDetailsArray = response;

          // empty the array for dropdowns to add it in case of refresh
          // this.subscriptionOptions = [];

          // subscriptionResponse.filter(async(response) => {
          //   const dropdDownOption = new SubscriptionDropDownOption();
          //   dropdDownOption.key = response.altsubId;
          //   dropdDownOption.text = response.altsub_description;
          //   dropdDownOption.value = response.altsubId;
          //   return this.subscriptionOptions.push(dropdDownOption);
          // });

          // this.updateCustomer = customerResponse;
          // this.securityQuestions = questions;
          // this.customerStatus = "default";
        });
  
         
        // return this.subscriptionOptions;
      } catch (error) {
        runInAction(() => {
          // this.customerStatus = "default";
        });
        throw error;
      }
    };
  



}