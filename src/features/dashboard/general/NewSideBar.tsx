import { observer } from "mobx-react-lite";
import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import "../../../../app/layout/assets/css/sidebar.css";
import { RootStoreContext } from "../../../app/stores/rootStore";

const NewSideBar = (props: any) => {
  const { navName } = props;
  const rootStore = useContext(RootStoreContext);
  const { collapse, setCollapse } = rootStore.commonStore;

  return (
    <div className={!collapse ? "sidebar open shadow" : "sidebar shadow"}>
      <div className="logo-details">
        {!collapse && (
          <img src="/images/SterlingGreenLogo.png" className="sterlingLogo" />
        )}
        {!collapse && <div className="logo_name"></div>}
        <i
          onClick={() => setCollapse(!collapse)}
          className={collapse ? "bx bx-menu " : "bx bx-menu-alt-right"}
          id="btn"
        ></i>
      </div>
      <ul className="nav-list">
        <li onClick={() => setCollapse(false)}>
          <i className="bx bx-search "></i>
          <input type="text" placeholder="Search..." />
          <span className="sidebarTooltip">Search</span>
        </li>
        <li>
          <NavLink
            to="/dashboard/analytics"
            className={navName === "Dashboard" ? "nav_active" : "nav_"}
          >
            <i className="bx bx-grid-alt"></i>
            <span className="links_name">Dashboard</span>
          </NavLink>

          <span className="sidebarTooltip">Dashboard</span>
        </li>
        <li>
          <NavLink
            to="/dashboard/msme"
            className={navName === "MSME" ? "nav_active" : "nav_"}
          >
            <i className="bx bxs-file-blank"></i>
            <span className="links_name">MSME</span>
          </NavLink>
          <span className="sidebarTooltip">MSME</span>
        </li>
        <li>
          <NavLink
            to="/dashboard/customer"
            className={navName === "Reporting" ? "nav_active" : "nav_"}
          >
            <i className="bx bx-transfer bx-rotate-90"></i>
            <span className="links_name">Reporting</span>
          </NavLink>
          <span className="sidebarTooltip">Reporting</span>
        </li>
        {/* <li>
          <NavLink
            to="/dashboard/product"
            className={navName === "Product" ? "nav_active" : "nav_"}
          >
            <i className="bx bx-package"></i>
            <span className="links_name">Product</span>
          </NavLink>
          <span className="sidebarTooltip">Product</span>
        </li> */}
        {/* <li>
          <NavLink
            to="/dashboard/package"
            className={navName === "Package" ? "nav_active" : "nav_"}
          >
            <i className="bx bx-briefcase"></i>
            <span className="links_name">Package</span>
          </NavLink>
          <span className="sidebarTooltip">Package</span>
        </li>
        <li>
          <NavLink
            to="/dashboard/merchants"
            className={navName === "Merchant" ? "nav_active" : "nav_"}
          >
            <i className="bx bx-store"></i>
            <span className="links_name">Merchant</span>
          </NavLink>
          <span className="sidebarTooltip">Merchant</span>
        </li>
        <li>
          <div className={navName === "Ticket" ? " a nav_active" : "a nav_"}>
            <i className="bx bx-file"></i>
            <span className="links_name">Ticket</span>
          </div>
          <span className="sidebarTooltip">Ticket</span>
        </li>
        <li>
          <NavLink
            to="/dashboard/roles"
            className={navName === "Roles" ? "nav_active" : "nav_"}
          >
            <i className="bx bx-user-check"></i>
            <span className="links_name">Roles</span>
          </NavLink>
          <span className="sidebarTooltip">Roles</span>
        </li>
        <li>
          <div className={navName === "Credit" ? " a nav_active" : "a nav_"}>
            <i className="bx bx-file"></i>
            <span className="links_name">Credit Card Management</span>
          </div>
          <span className="sidebarTooltip">Credit Card Management</span>
        </li> */}
        <li className="profile">
          <div className="profile-details">
            <img src="/images/avatar.png" alt="profileImg" />
            <div className="name_job">
              <div className="name">Username</div>
              <div className="job">Role</div>
            </div>
          </div>
          <i className="bx bx-log-out" id="log_out"></i>
        </li>
      </ul>
    </div>
  );
};

export default observer(NewSideBar);
