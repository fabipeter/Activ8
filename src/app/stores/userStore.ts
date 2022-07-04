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
import {
  ChangePasswordFormValues,
  CorporateLoginFormValues,
  CorporateRegistrationFormValues,
  CustomerLoginFormValues,
  IUserFormValues,
} from "../models/user";

export default class UserStore {
  rootStore: RootStore;
  user: any;
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

  @action corporateLogin = async (values: CustomerLoginFormValues) => {
    try {
      // console.log(values);
      runInAction(() => {
        this.corporateLoginLoading = true;
      });
      const response = await agent.User.corporate_login(values);
      // console.log(response);
      if (response.isSuccess) {
        runInAction(() => {
          this.loginVerification = response.isSuccess;
          this.corporateLoginLoading = false;
        });
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

  @action validateUser = async (emailAddress: string, otp: string) => {
    try {
      runInAction(() => {
        this.corporateLoginLoading = true;
      });

      let details = {
        emailAddress: emailAddress,
        otp: otp.toString(),
      };

      // console.log(details);

      const response = await agent.User.validateMToken(details);
      if (response.accessToken) {
        // throw false;
        this.rootStore.commonStore.setisLoggedIn(
          "dHJ1ZXNlY3JldEtleT1BY3Rpdjg="
        );
        this.rootStore.commonStore.setToken(response.accessToken);
        this.rootStore.commonStore.setRefreshToken(response.refreshToken);
        this.rootStore.commonStore.setUser(response.loginDetails);

        // this.loginVerification = response.isSuccess;
        this.setLoginVerification(false);
        this.setCorporateLoginLoading(false);
        history.push("/dashboard/analytics");
        // return false;
      } else {
        throw response.message;
      }
    } catch (error) {
      runInAction(() => {
        this.corporateLoginLoading = false;
      });
      // // console.log(error);
      throw error;
    }
  };

  @action register = async (values: CorporateRegistrationFormValues) => {
    try {
      runInAction(() => {
        this.merchantRegistrationStatus = "loading";
      });

      // console.log(request);
      const response = await agent.User.register(values);
      // console.log(response);
      if (response.isSuccess) {
        // throw false;
        // this.rootStore.commonStore.setToken(response..token);
        // this.rootStore.commonStore.setUser(response);
        runInAction(() => {
          this.merchantRegistrationStatus = "success";
        });
      } else {
        runInAction(() => {
          this.merchantRegistrationStatus = "failure";
        });
        toast.error("Email Already Exists");
      }
    } catch (error) {
      // console.log(error);
      runInAction(() => {
        this.merchantRegistrationStatus = "false";
      });
      // console.log(error)
      // toast.error("Problem Submitting data");
      throw error;
    }
  };

  @action resetPassword = async (values: string) => {
    try {
      runInAction(() => {
        this.merchantRegistrationStatus = "loading";
      });

      const request = {
        registrationNumber: values,
      };

      const response = await agent.User.reset_password(request);
      if (response.isSuccess) {
        runInAction(() => {
          this.merchantRegistrationStatus = "success";
        });
      } else {
        runInAction(() => {
          this.merchantRegistrationStatus = "success";
        });
      }
    } catch (error) {
      runInAction(() => {
        this.merchantRegistrationStatus = "success";
      });
      throw error;
    }
  };

  @action changePassword = async (values: ChangePasswordFormValues) => {
    try {
      runInAction(() => {
        this.merchantRegistrationStatus = "loading";
      });

      const request = {
        temporaryPassword: values.temporaryPassword,
        newPassword: values.newPassword,
      };
      const response = await agent.User.change_password(request);
      if (response.isSuccess) {
        runInAction(() => {
          this.merchantRegistrationStatus = "success";
        });
      } else {
        runInAction(() => {
          this.merchantRegistrationStatus = "failure";
        });
        toast.info(response.message);
      }
    } catch (error) {
      runInAction(() => {
        this.merchantRegistrationStatus = "success";
      });
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
        this.rootStore.commonStore.setToken(null);
        this.rootStore.commonStore.setRefreshToken(null);
        this.rootStore.commonStore.setisLoggedIn(null);
        this.rootStore.commonStore.setUser(null);
        this.rootStore.commonStore.setProfileStatus(null);
        window.localStorage.removeItem("jwt");
        window.localStorage.removeItem("refreshToken");
        window.localStorage.removeItem("isLoggedIn");
        window.localStorage.removeItem("user");
        window.localStorage.removeItem("profileStatus");
        this.setLoginStatus("");
        history.push("/");
      }, 2000);
    });
  };

  @action clearStorage = () => {
    this.rootStore.commonStore.setToken(null);
    this.rootStore.commonStore.setRefreshToken(null);
    this.rootStore.commonStore.setisLoggedIn(null);
    this.rootStore.commonStore.setUser(null);
    this.rootStore.commonStore.setProfileStatus(null);
    window.localStorage.removeItem("jwt");
    window.localStorage.removeItem("refreshToken");
    window.localStorage.removeItem("isLoggedIn");
    window.localStorage.removeItem("user");
    window.localStorage.removeItem("profileStatus");
    this.setLoginStatus("");
    history.push("/");
  };
}
