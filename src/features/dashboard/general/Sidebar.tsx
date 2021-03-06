import React, { useContext, useState } from "react";
import { Icon, Menu } from "semantic-ui-react";
import { BiUserCheck, BiCreditCard } from "react-icons/bi";
import { NavLink } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { RootStoreContext } from "../../../app/stores/rootStore";
import { history } from "../../..";

const Sidebar = (props: any) => {
  const { navName } = props;
  const rootStore = useContext(RootStoreContext);
  const { logout } = rootStore.userStore;
  const [showDropDown, setShowDropDown] = useState(false);
  return (
    <div className="sideBar d-none d-lg-inline my-3 ml-3 sticky-top">
      <h2 className=" font-weight-bolder text-white mb-0 pl-0">
        <img
          src="/images/ACTIV8 SVG (1).svg"
          className="mx-auto d-block mb-1 logoSize"
          alt="Alt Finance Logo"
        />
      </h2>
      <div className="sideBar_links mt-4 ">
        <div className="dashboard-nav">
          <NavLink
            to="/dashboard/analytics"
            className={navName === "Dashboard" ? "mb-3 active" : "mb-3"}
          >
            <i className="fa-solid fa-house"></i>
            <span>Dashboard</span>
          </NavLink>
          <NavLink
            to="/dashboard/coupon"
            className={navName === "Coupon" ? "mb-3 active" : "mb-3"}
          >
            <i className="fas fa-ticket-alt"></i>
            <span> Coupon</span>
          </NavLink>

          <a
            className={
              navName === "MSME" ? "mb-3 active cursorPointer" : "mb-3 cursorPointer"
            }
            onClick={() => setShowDropDown(!showDropDown)}
          >
            <i className="fa-solid fa-user-md"></i>
            <span>Profile</span>
            <i className="fa-solid fa-caret-down ml-3"></i>
          </a>
          <ul
            className={showDropDown ? "collapse show" : "collapse"}
            id="MSME_SubMenu"
          >
            <li
              onClick={() => history.push("/dashboard/change-password")}
              className="cursorPointer"
            >
              {" "}
              <a className="cursorPointer">
                <span className="ml-1"> Change Password</span>
              </a>
            </li>
          </ul>
          {/* <NavLink
            to="/dashboard/reporting"
            className={navName === "Reporting" ? "mb-3 active" : "mb-3"}
          >
            <i className="fa-solid fa-arrow-right-arrow-left fa-rotate-90 "></i>
            <span>Reporting</span>
          </NavLink> */}
          <a className="mb-3 log-outBox cursorPointer" onClick={logout}>
            <i className="fa-solid fa-arrow-right-from-bracket"></i>
            <span>Log out</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default observer(Sidebar);
