import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import {
  RouteProps,
  RouteComponentProps,
  Route,
  Redirect,
} from "react-router-dom";
import Navbar from "../../../features/dashboard/general/Navbar";
import NewSideBar from "../../../features/dashboard/general/NewSideBar";
import Sidebar from "../../../features/dashboard/general/Sidebar";
import { RootStoreContext } from "../../stores/rootStore";
import jwt_decode from "jwt-decode";
import LoadingModal from "../../../features/general/LoadingModal";

interface IProps extends RouteProps {
  component: React.ComponentType<RouteComponentProps<any>>;
  navName: string;
  subNavName: string;
  navTitle: string;
}

const RouteWithCorporateDashboard: React.FC<IProps> = ({
  exact,
  path,
  navName,
  navTitle,
  subNavName,
  component: Component,
  ...rest
}) => {
  const rootStore = useContext(RootStoreContext);
  const { loginStatus } = rootStore.userStore;
  const { isLoggedIn } = rootStore.commonStore;
  // const decodedSub = {
  //   role: "Merchant",
  // };
  const token = window.localStorage.getItem("jwt");
  // const isLoggedIn = window.localStorage.getItem("isLoggedIn");

  return (
    <Route
      exact={exact}
      path={path}
      {...rest}
      render={(routeProps) =>
        !token || isLoggedIn !== "dHJ1ZXNlY3JldEtleT1BY3Rpdjg=" ? (
          <Redirect to="/" />
        ) : (
          <>
            <div className="wrapper d-flex" style={{ gap: "2px" }}>
              {loginStatus === "loading" && <LoadingModal />}
              <Sidebar navName={navName} />
              <div className="inner-wrapper col container-fluid px-0 mx-3 my-3">
                <Navbar navName={navTitle} subNavName={subNavName} />
                <Component {...routeProps} />
              </div>
            </div>
          </>
        )
      }
    />
  );
};

export default observer(RouteWithCorporateDashboard);
