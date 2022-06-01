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
import { RootStoreContext } from "../../stores/rootStore";
import jwt_decode from "jwt-decode";

interface IProps extends RouteProps {
  component: React.ComponentType<RouteComponentProps<any>>;
  navName: string;
  subNavName: string;
  navTitle: string;
}

const RouteWithAuthorization: React.FC<IProps> = ({
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
  const decoded = JSON.parse(JSON.stringify(jwt_decode(token!)));
  return (
    <Route
      exact={exact}
      path={path}
      {...rest}
      render={(routeProps) =>
        !token || token === null ? (
          <Redirect to="/" />
        ) : (
          <Component {...routeProps} />
        )
      }
    />
  );
};

export default observer(RouteWithAuthorization);
