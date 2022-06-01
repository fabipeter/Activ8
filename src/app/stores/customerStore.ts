import { action, makeAutoObservable, observable, runInAction } from "mobx";
import { toast } from "react-toastify";
import agent from "../api/agent";
import { CustomerRegistrationForm, CustomerRegistrationFormValues, ICustomer, ICustomerTransaction, SecurityQuestion, SubscriptionDropDownOption } from "../models/customer";
import { RootStore } from "./rootStore";

export default class CustomerStore{
    rootStore: RootStore;
  
    constructor(rootStore: RootStore) {
      // update mobx lite to read observables
      makeAutoObservable(this);
  
      this.rootStore = rootStore;
    }



    @observable loadingInitial = false;
    @observable customerStatus = "default";
    @observable customerActivatedStatus = "default";
    @observable customerRegistrationStatus = "default";
    @observable customerList: ICustomer[] | null = null;
    @observable customerTransactionList: ICustomerTransaction[] | null = null;
    @observable securityQuestions: SecurityQuestion[]= [];
    @observable subscriptionOptions: SubscriptionDropDownOption[]  = [];


    @action setStatus = (x: string) => {
        this.customerStatus = x;
    };
    @action setActivatedStatus = (x: string) => {
      this.customerActivatedStatus = x;
    };
    @action setRegistrationStatus = (x: string) => {
      this.customerRegistrationStatus = x;
    };
    @action setLoadingInitial = (x: boolean) => {
        this.loadingInitial = x;
      };
    
    

    @action register = async (values: CustomerRegistrationForm, accountType:number) => {
      try {
        
        runInAction(() => {
          this.customerRegistrationStatus = "loading";
        });

        const request = {
          username:values.username,
          email:values.email,
          bvn:values.registrationNUmber,
          isStaff:values.isStaff,
          staffId:values.isStaff?values.staffId:"",
          tin:values.tin,
          safAccountNumber:values.safAccountNumber,
          accountType:accountType,
          password:values.password
        }
        // console.log(request);
        const response = await agent.Customer.register(request);
        // console.log(response);
        if (response.response) {
          // throw false;
          // this.rootStore.commonStore.setToken(response.response.token);
          // this.rootStore.commonStore.setUser(response);
          runInAction(() => {
            this.customerRegistrationStatus = "success";
          });
          
        } else {
          runInAction(() => {
            this.customerRegistrationStatus = response.message;
          });
          
          
        }
        
      } catch (error) {
        // console.log(error);
        runInAction(() => {
          this.customerRegistrationStatus = "false";
        });
        // console.log(error)
        // toast.error("Problem Submitting data");
        throw error;
      }
    };
  


    @action verifySAFAccount = async (values:CustomerRegistrationForm,accountType:number) => {
      runInAction(() => {
        this.customerStatus = "loading";
      });

      const request= {
        safAccountNumber:values.safAccountNumber,
        email:values.email,
        accountType:accountType
      }
      try {
         const response = await agent.Verification.verify_saf_account(request);
          // console.log(response);
  
          if (response.response) {
            runInAction(() => {              
              this.customerStatus = "success";
            });
            // console.log(response);
            return this.customerStatus;
          } else {
            runInAction(() => {
              this.customerStatus = "failure";
            });
            toast.error("Problem Submitting data");
            
          }
      } catch (error) {
        runInAction(() => {
          this.customerStatus = "failure";
        });
        // toast.error("Invalid Account Details");
        throw error;

      }
    };
  

    
    @action verifyTIN = async (values:CustomerRegistrationForm) => {
      runInAction(() => {
        this.customerActivatedStatus = "loading";
      });

      
      try {
         const response = await agent.Verification.verify_tin(values.tin);
          // console.log(response);
  
          if (response.response) {
            runInAction(() => {              
              this.customerActivatedStatus = "success";
            });
            // console.log(response);
            return response.response;
          } else {
            runInAction(() => {
              this.customerActivatedStatus = "failure";
            });
            toast.error("Could not verify TIN");
            
          }
      } catch (error) {
        runInAction(() => {
          this.customerActivatedStatus = "failure";
        });
        // toast.error("Invalid Account Details");
        toast.error("Could not verify TIN");
        throw error;
        

      }
    };



  @action verifyOTP = async (otp: string, email:string) => {
    try {
      runInAction(() => {
        this.customerActivatedStatus = "loading";
      });

      const request = {
        email: email,
        otp: otp,
      };

      const response = await agent.Verification.verify_saf_otp(request);
      if (response.message === "Successful") {
        
        runInAction(() => {
          this.customerActivatedStatus = "success";
        });
      } else {
        
        runInAction(() => {
          this.customerActivatedStatus = "failure";
        });
        toast.error("Problem Submitting data");
      }
    } catch (error) {      
        
        runInAction(() => {
          this.customerActivatedStatus = "failure";
        });
      // toast.error("Problem Submitting data");
      throw error;
    }
  };

  // @action updateCustomer = async (values:CustomerRegistrationForm) => {
  //   try {
  //     runInAction(() => {
  //       this.customerStatus = "loading";
  //     });

  //     const request ={
  //       username:values.safAccountNumber,
  //       password:values.password,
  //       email:values.email
  //     }

  //     // console.log(this.updateCustomer,reset);
  //     const response = await agent.Customer.updateCustomer(request);
  //     if (response.isSuccess) {
  //       runInAction(() => {
  //         this.customerList = null;
  //         this.customerStatus = "success";
  //       });
  //       // console.log(response);
  //       return this.customerStatus;
  //     } else {
  //       runInAction(() => {
  //         this.customerStatus = "inelligible";
  //       });
  //       toast.error("Problem Submitting data");
  //       return this.customerStatus;
  //     }
  //   } catch (error) {
  //     toast.error("Problem Submitting data");
  //     throw error;
  //   }
  // };


}