import { RootStore } from "./rootStore";
import { observable, action, reaction, makeAutoObservable, runInAction } from "mobx";
import jwt_decode from "jwt-decode";
import agent from "../api/agent";
import { history } from "../..";
import { toast } from "react-toastify";



export default class CommonStore {
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);

    reaction(
      () => this.token,
      (token) => {
        if (token) {
          window.localStorage.setItem("jwt", token);
        } else {
          window.localStorage.removeItem("jwt");
        }
      }
    );

    reaction(
      () => this.refreshToken,
      (refreshToken) => {
        if (refreshToken) {
          window.localStorage.setItem("refreshToken", refreshToken);
        } else {
          window.localStorage.removeItem("refreshToken");
        }
      }
    );

    reaction(
      () => this.mToken,
      (mToken) => {
        if (mToken) {
          window.localStorage.setItem("mToken", mToken);
        } else {
          window.localStorage.removeItem("mToken");
        }
      }
    );

    reaction(
      () => this.loggedInUser,
      (loggedInUser) => {
        if (loggedInUser) {
          window.localStorage.setItem("user", JSON.stringify(loggedInUser));
        } else {
          window.localStorage.removeItem("user");
        }
      }
    );

    reaction(
      () => this.profileStatus,
      (profileStatus) => {
        if (profileStatus) {
          window.localStorage.setItem(
            "profileStatus",
            JSON.stringify(profileStatus)
          );
        } else {
          window.localStorage.removeItem("profileStatus");
        }
      }
    );
  }


  @observable mToken: any | null = window.localStorage.getItem("mToken");
  @observable token: string | null = window.localStorage.getItem("jwt");
  @observable refreshToken: string | null =
    window.localStorage.getItem("refreshToken");

  @observable loggedInUser: any | null = JSON.parse(
    window.localStorage.getItem("user")!
  );
  @observable profileStatus: any | null = JSON.parse(
    window.localStorage.getItem("profileStatus")!
  );
  @observable appLoaded = false;
  @observable collapse = false;
  @observable redirectStatus = "";

  @action setmToken = (token: any | null) => {
    this.mToken = token;
  };
  @action setToken = (token: string | null) => {
    this.token = token;
  };

  @action setRefreshToken = (refreshToken: string | null) => {
    this.refreshToken = refreshToken;
  };

  @action setUser = (user: any | null) => {
    this.loggedInUser = user;
  };

  @action setProfileStatus = (profileStatus: any | null) => {
    this.profileStatus = profileStatus;
  };

  @action setAppLoaded = () => {
    this.appLoaded = true;
  };

  
  @action setCollapse = (collapse:boolean) => {
    this.collapse = collapse;
  };

  @action setRedirectStatus = (redirectStatus:string) => {
    this.redirectStatus = redirectStatus;
  };


  @action checkTokenExpiration = async () => {
    try {
      // console.log("checking...")
      const decoded = JSON.parse(JSON.stringify(jwt_decode(this.token!)));

      // Get Current Date Time
      const date = new Date(0);

      // Convert EXp Time to UTC
      let tokenExpDate = date.setUTCSeconds(decoded.exp);

      if (tokenExpDate.valueOf() < new Date().valueOf()) {
        // config.headers.Authorization = `Bearer ${token}`;
        const refreshObject = {
          refreshToken: this.refreshToken!,
        };

        const response = await agent.User.current(refreshObject);
        // console.log(response);
        if (response.accessToken) {
          this.setToken(response.accessToken);
          this.setRefreshToken(response.refreshToken);
          this.setUser(response);
        }
        // else {
        //   window.localStorage.removeItem("jwt");
        //   window.localStorage.removeItem("refreshToken");
        //   window.localStorage.removeItem("user");
        //   window.localStorage.removeItem("profileStatus");
        //   history.push("/");
        //   toast.info("Your session has expired, please login again");
        // }
      }
    } catch {
      // window.localStorage.removeItem("jwt");
      // window.localStorage.removeItem("refreshToken");
      // window.localStorage.removeItem("user");
      // window.localStorage.removeItem("profileStatus");
      // history.push("/");
      toast.info("Your session has expired, please login again");
    }
  };


  @action paymentRedirect = async (query:string) =>
    {
      this.setRedirectStatus("loading");
        

      const response = await fetch(
      `${process.env.REACT_APP_REDIRECT_URL}${query}`,
      {
        method: "GET",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
          Device: "device",
          // Authorization: `Bearer ${window.localStorage.getItem("jwt")!}`,
        },
        redirect: "follow",
        referrer: "no-referrer",
        // body: JSON.stringify({
        //   status: window.localStorage.getItem("refreshToken")!,
        // }),
      }
    );


    return response;
      
     
  }

  

  @action tokenRefresh = async () =>
    await fetch(
      `${process.env.REACT_APP_API_URL}/AdminAuthentication/RefreshToken`,
      {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
          Device: "device",
          Authorization: `Bearer ${window.localStorage.getItem("jwt")!}`,
        },
        redirect: "follow",
        referrer: "no-referrer",
        body: JSON.stringify({
          refreshToken: window.localStorage.getItem("refreshToken")!,
        }),
      }
    );

  @action getTokenRemainingTime() {
    const accessToken = localStorage.getItem("jwt");
    if (!accessToken) {
      return 0;
    }
    const jwtToken = JSON.parse(atob(accessToken.split(".")[1]));

    const expires = new Date(jwtToken.exp * 1000);
    // const dif = expires.getTime() - Date.now();
    // console.log(dif)
    return expires.getTime() - Date.now();
  }


  @action clearLocalStorage() {
    window.localStorage.removeItem("jwt");
    window.localStorage.removeItem("refreshToken");
    window.localStorage.removeItem("mToken");
    window.localStorage.removeItem("user");
    window.localStorage.removeItem("profileStatus");
    history.push("/");  
    toast.info("Your session has expired, please login again");
  }
};
