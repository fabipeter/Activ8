import {
    action,
    computed,
    makeAutoObservable,
    observable,
    runInAction,
  } from "mobx";
  import agent from "../api/agent";
  
  import { history } from "../..";
  import { toast } from "react-toastify";
import { RootStore } from "./rootStore";
import { CorporateLoginFormValues, CorporateRegistrationFormValues, CustomerLoginFormValues, IUserFormValues } from "../models/user";
  
  export default class UserStore {
    rootStore: RootStore;
  
    constructor(rootStore: RootStore) {
      // update mobx lite to read observables
      makeAutoObservable(this);
  
      this.rootStore = rootStore;
    }
  
    
  
    @observable loginVerification: boolean = false;
    @observable loginLoading: boolean = false;
    @observable loginStatus: string = "";
  
    @observable corporateLoginLoading: boolean = false;
    @observable adminLoginVerification: boolean = false;
    @observable merchantRegistrationStatus = "default";
    
  
  
  
    
  
    @action setLoginLoading = (x: boolean) => {
      this.loginLoading = x;
    };    
  
    @action setLoginVerification = (x: boolean) => {
      this.loginVerification = x;
    };
    @action setAdminLoginVerification = (x: boolean) => {
      this.adminLoginVerification = x;
    };
    @action setCorporateLoginLoading = (x: boolean) => {
      this.corporateLoginLoading = x;
    };    
    @action setActivatedStatus = (x: string) => {
      this.merchantRegistrationStatus = x;
    };

    @action setLoginStatus = (x: any) => {
      this.loginStatus = String(x);
    };
   
  
    @action login = async (values: CustomerLoginFormValues) => {
      try {
        // console.log(values);
        runInAction(() => {
          this.loginLoading = true;
        });
        const response = await agent.User.login(values);
        // console.log(response);
        if (response.response) {
          
          runInAction(() => {
            // throw false;
          this.rootStore.commonStore.setToken(response.token);
          this.rootStore.commonStore.setisLoggedIn();

          // this.setCustomerModalLoginVerification(false);
            this.loginLoading = false;
          });
          history.push("/dashboard/analytics");
          
        } else {
          // console.log(response.userName)
          throw response;
        }
        
      } catch (error) {
        // console.log(error);
        runInAction(() => {
          this.loginLoading = false;
        });
        throw error;
      }
    };
  

    @action corporateLogin = async (values: CorporateLoginFormValues) => {
      try {
        // console.log(values);
        runInAction(() => {
          this.corporateLoginLoading = true;
        });
        const response = await agent.User.corporate_login(values);
        // console.log(response);
        if (response.response) {
         
          runInAction(() => {
             // throw false;
          this.rootStore.commonStore.setUser(response);
          this.rootStore.commonStore.setToken(response.token);
          this.rootStore.commonStore.setisLoggedIn();
            this.corporateLoginLoading = false;
          });
          history.push("/dashboard/analytics");
          
        } else {
          // console.log(response.userName)
          throw "Invalid Details";
        }
        
      } catch (error) {
        // console.log(error);
        runInAction(() => {
          this.corporateLoginLoading = false;
        });
        throw error;
      }
    };
  
    @action validateUser = async (username: string, otp: string) => {
      try {
        runInAction(() => {
          this.corporateLoginLoading = true;
        });
  
        let details = {
          username: username,
          otp: otp.toString(),
        };
  
        // console.log(details);
  
        const response = await agent.User.validateMToken(details);
        if (response.response) {
          // throw false;
          this.rootStore.commonStore.setisLoggedIn();
          this.rootStore.commonStore.setToken(this.rootStore.commonStore.loggedInUser.accessToken);

          this.setAdminLoginVerification(false);
          this.setCorporateLoginLoading(false);
          history.push("/dashboard/analytics");
          // return false;
        } else {
          this.setAdminLoginVerification(false);
          this.setCorporateLoginLoading(false);
          history.push("/dashboard/analytics");
          // throw response.message;
        }
      } catch (error) {
        this.rootStore.commonStore.setisLoggedIn();
        this.rootStore.commonStore.setToken("jdfsdofaijeweihqerqehj");
        this.setAdminLoginVerification(false);
          this.setCorporateLoginLoading(false);
          history.push("/dashboard/analytics");
        // runInAction(() => {
        //   this.corporateLoginLoading = false;
        // });
        // // console.log(error);
        // throw error;
      }
    };
  
    
    @action register = async (values: CorporateRegistrationFormValues) => {
      try {
        
        runInAction(() => {
          this.merchantRegistrationStatus = "loading";
        });

        const request = {
          registrationNumber:values.registrationNumber,
          password:values.password,
          confirmPassword:values.confirmPassword
        }
        // console.log(request);
        const response = await agent.User.register(request);
        // console.log(response);
        if (response.response) {
          // throw false;
          // this.rootStore.commonStore.setToken(response..token);
          // this.rootStore.commonStore.setUser(response);
          runInAction(() => {
            this.merchantRegistrationStatus = "success";
          });
          
        } else {
          runInAction(() => {
            this.merchantRegistrationStatus = response.message;
          });
          
          
        }
        
      } catch (error) {
        // console.log(error);
        runInAction(() => {
          this.merchantRegistrationStatus  = "false";
        });
        // console.log(error)
        // toast.error("Problem Submitting data");
        throw error;
      }
    };
  
    @action getUser = async () => {
      try {
        // let token = {
        //   refreshToken: this.rootStore.commonStore.refreshToken!,
        // };
        // const user = await agent.User.current(token);
        // // console.log(user);
      } catch (error) {
        // console.log(error);
      }
    };
  
    @action logout = () => {
      runInAction(() => {
        this.loginStatus = "loading";
        setTimeout(() => {
          window.localStorage.removeItem("jwt");
          window.localStorage.removeItem("refreshToken");
          window.localStorage.removeItem("mToken");
          window.localStorage.removeItem("user");
          window.localStorage.removeItem("profileStatus");
        }, 2000);

        setTimeout(() => {
          this.setLoginStatus("")
          history.push("/");
        }, 2000);
      });
    };
  
    @action clearStorage = () => {
      window.localStorage.removeItem("jwt");
      window.localStorage.removeItem("refreshToken");
      window.localStorage.removeItem("mToken");
      window.localStorage.removeItem("user");
      window.localStorage.removeItem("profileStatus");
      // history.push("/login");
    };
  }
  