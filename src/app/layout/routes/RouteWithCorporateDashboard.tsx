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
  const { token } = rootStore.commonStore;
  const {loginStatus} = rootStore.userStore;
  const decodedSub = {
    role: "Merchant",
  };
  // const decoded = JSON.parse(JSON.stringify(jwt_decode(token!)));
  return (
    <Route
      exact={exact}
      path={path}
      {...rest}
      render={(routeProps) =>
        !decodedSub || decodedSub.role !== "Merchant" ? (
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
