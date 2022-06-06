import { observer } from "mobx-react-lite";
import React, { useCallback, useContext, useEffect, useState } from "react";
import {
  Route,
  RouteComponentProps,
  Switch,
  withRouter,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { history } from "../..";
import LoadingSpinner from "../../features/general/LoadingSpinner";
import HomePage from "../../features/home/HomePage";
import LoginPage from "../../features/authentication/login/LoginPage";
import { RootStoreContext } from "../stores/rootStore";
import NotFound from "../../features/NotFound";
import RouteWithAuthorization from "./routes/RouteWithAuthorization";
import DashboardAnalytics from "../../features/dashboard/core/DashboardAnalytics";
import RouteWithCorporateDashboard from "./routes/RouteWithCorporateDashboard";
import CouponPage from "../../features/dashboard/coupon/CouponPage";
import GenerateCouponPage from "../../features/dashboard/coupon/GenerateCouponPage";
import ScanCouponPage from "../../features/dashboard/coupon/ScanCouponPage";
import LoginPage2 from "../../features/authentication/login/LoginPage2";
import CorporateRegisterForm from "../../features/authentication/register/CorporateRegisterForm";
import CorporateLoginPage from "../../features/authentication/login/steps/CorporateLoginPage";

const App: React.FC<RouteComponentProps> = () => {
  const rootStore = useContext(RootStoreContext);
  const {
    isLoggedIn,
    setAppLoaded,
    token,
    appLoaded,
    tokenRefresh,
    clearLocalStorage,
    getTokenRemainingTime,
  } = rootStore.commonStore;
  // const { getUser, isLoggedIn } = rootStore.userStore;

  const calculateTimeLeft = useCallback(() => {
    return getTokenRemainingTime();
  }, [getTokenRemainingTime]);

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [refresh, setRefresh] = useState(true);

  useEffect(() => {
    if (token) {
      // if (searchedPropertyList === null) {
      //   // loadAllProperties();
      // }
      setAppLoaded();

      const timer = setTimeout(() => {
        setTimeLeft(calculateTimeLeft());
      }, 1000);

      if (atob(isLoggedIn!.split("secretKey=Activ8")[1]) === token) {
        // if (timeLeft < 160000) {
        //   console.log(timeLeft);
        //   console.log(refresh);
        //   // clearLocalStorage();
        // }
        // console.log(timeLeft);
        if (timeLeft > 0 && timeLeft < 120000 && refresh) {
          setRefresh(false);

          try {
            tokenRefresh()
              .then((data) => (!data.ok ? data : data.json()))
              .then((data) => {
                if (data.accessToken) {
                  const { refreshToken, accessToken } = data;
                  window.localStorage.setItem("jwt", accessToken);
                  window.localStorage.setItem("refreshToken", refreshToken);
                  // console.log("refreshed");
                  setTimeLeft(calculateTimeLeft());
                  setRefresh(true);
                } else {
                  // console.log("retrying refresh...");
                  // setTimeLeft(calculateTimeLeft());
                  // setRefresh(true);
                  clearLocalStorage();
                  history.push("/");
                }
              });
          } catch {
            clearLocalStorage();
            history.push("/");
          }
        } else if (timeLeft < 0) {
          clearLocalStorage();
          history.push("/");
        }

        return () => clearTimeout(timer);
      }
    } else {
      setAppLoaded();
    }
  }, [
    isLoggedIn,
    setAppLoaded,
    token,
    timeLeft,
    refresh,
    setRefresh,
    tokenRefresh,
    getTokenRemainingTime,
    clearLocalStorage,
    setTimeLeft,
    calculateTimeLeft,
  ]);

  if (!appLoaded) return <LoadingSpinner />;

  return (
    <>
      <ToastContainer position="bottom-right" />
      {/* <ModalContainer /> */}
      <Switch>
        {/* <h1>hsdf</h1> */}
        <Route exact path="/" component={HomePage} />
        {/* <Route exact path="/login" component={LoginPage} /> */}
        <Route exact path="/login" component={CorporateLoginPage} />
        <Route exact path="/register" component={CorporateRegisterForm} />
        {/* <Route exact path="/finance" component={FinanceForm} /> */}

        <RouteWithCorporateDashboard
          exact
          path="/dashboard/analytics"
          component={DashboardAnalytics}
          navName="Dashboard"
          navTitle="Dashboard"
          subNavName=""
        />

        <RouteWithCorporateDashboard
          exact
          path="/dashboard/coupon"
          component={CouponPage}
          navName="Coupon"
          navTitle="Coupon"
          subNavName=""
        />
        <RouteWithCorporateDashboard
          exact
          path="/dashboard/generateCoupon"
          component={GenerateCouponPage}
          navName="Coupon"
          navTitle="Coupon"
          subNavName=""
        />
        <RouteWithCorporateDashboard
          exact
          path="/dashboard/scanCoupon"
          component={ScanCouponPage}
          navName="Coupon"
          navTitle="Coupon"
          subNavName=""
        />
        {/* Dashboard */}

        {/* <RouteWithAuthorization
          exact
          path="/finance"
          component={FinanceForm}
          navName="Finance"
          navTitle="Finance"
          subNavName=""
        /> */}

        {/* End Of Dashboard */}

        <Route component={NotFound} />
      </Switch>
    </>
  );
};

export default withRouter(observer(App));
