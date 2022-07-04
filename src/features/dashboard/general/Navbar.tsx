import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Dropdown, Icon } from "semantic-ui-react";
import { history } from "../../..";
import { RootStoreContext } from "../../../app/stores/rootStore";

const Navbar = (props: any) => {
  const { navName, subNavName } = props;
  const rootStore = useContext(RootStoreContext);
  const { logout } = rootStore.userStore;
  const [collapse, setCollapse] = useState(false);
  const loggedInUser = JSON.parse(window.localStorage.getItem("user")!);
  const [showDropDown, setShowDropDown] = useState(false);
  const [showBellDropDown, setShowBellDropDown] = useState(false);

  return (
    <nav className="navbar navbar-expand-lg navbar-light mx-0  navbar-style">
      <div
        className="d-flex justify-content-between align-content-center"
        style={{ gap: "5px" }}
      >
        <img src="/images/welcome-Icon.svg" alt="" />
        <div className="text-white">
          <span>
            <b>Welcome</b> {loggedInUser.companyName}
          </span>
          <br />
          {/* <span className="small">Product Team</span> */}
        </div>
      </div>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
        onClick={() => setCollapse(!collapse)}
      >
        {/* <!-- <span className="navbar-toggler-icon"></span> --> */}
        <span className="toggler-icon top-bar"></span>
        <span className="toggler-icon middle-bar"></span>
        <span className="toggler-icon bottom-bar"></span>
      </button>

      <div
        className={
          collapse
            ? "collapse show navbar-collapse row mx-0"
            : "collapse navbar-collapse row mx-0"
        }
        id="navbarSupportedContent"
      >
        <div className=" d-flex col-lg-9 justify-content-end mx-0">
          <div className="col-lg-6 px-0">
            <form className="form-row my-2 my-lg-0 searchBar">
              <input
                className="form-control py-4 "
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <span className="searchBar_Icon pb-0">
                <img src="/images/binocular.svg" alt="" />
              </span>
            </form>
          </div>
        </div>
        <div
          className="d-flex col-md-3 justify-content-md-around mx-0 pl-5"
          style={{ display: "flex", justifyContent:"right" }}
        >
          {/* <div
            className={showBellDropDown ? "col dropdown show" : "col dropdown"}
          >
            <img
              src="/images/bell-icon.svg"
              alt=""
              className=" pt-4 ml-lg-5 bell-position dropdown-toggle"
              data-toggle="dropdown"
              onClick={() => setShowBellDropDown(!showBellDropDown)}
              // onMouseLeave={() => setShowBellDropDown(!showBellDropDown)}
            />
            <span
              className="badge badge-light ml-lg-5 cursorPointer"
              data-toggle="dropdown"
              onClick={() => setShowBellDropDown(!showBellDropDown)}
              // onMouseLeave={() => setShowBellDropDown(!showBellDropDown)}
            >
              3
            </span>

            <div
              className={
                showBellDropDown
                  ? "dropdown-menu dropdown-menu-center bell-container show"
                  : "dropdown-menu dropdown-menu-center bell-container"
              }
              aria-labelledby="dropdownMenuLink"
            >
              <a className="dropdown-item bell-dropdown1 mb-3" href="#">
                <img src="/images/pending-approval-icons.svg" alt="" />
                <div className="d-flex bell-dropdown2">
                  <div className=" mx-3">
                    Coupon Generation <br />{" "}
                    <span className="small">
                      <i className="fas fa-ticket-alt"></i>
                    </span>
                  </div>
                  <div className=" mx-2 small">
                    <span className="text-danger">Pending approval</span>
                    <br /> <span className="small">2 hours ago</span>
                  </div>
                </div>
              </a>
              <a className="dropdown-item bell-dropdown1 mb-3" href="#">
                <img src="/images/pending-approval-icons.svg" alt="" />
                <div className="bell-dropdown2">
                  <div className=" mr-4">
                    Coupon Validation <br />{" "}
                    <span className="small">
                      <i className="fa-solid fa-check-double mx-2"></i>
                    </span>
                  </div>
                  <div className=" mx-2 small">
                    <span className="text-danger">Pending approval</span>
                    <br /> <span className="small">1 day ago</span>
                  </div>
                </div>
              </a>
              <a className="dropdown-item  bell-dropdown1" href="#">
                <img src="/images/pending-approval-icons.svg" alt="" />
                <div className="bell-dropdown2">
                  <div className=" mr-5 pr-5">
                    QR Scan <br />{" "}
                    <span className="small">
                      <i className="fa-solid fa-qrcode mx-2"></i>
                    </span>
                  </div>
                  <div className=" mx-2 small">
                    <span className="text-danger">Pending approval</span>
                    <br /> <span className="small">3 days ago</span>
                  </div>
                </div>
              </a>
            </div>
          </div> */}
          <div className="col">
            {/* <img
              src={loggedInUser.thumbnail}
              alt=""
              className=" float-md-right userPhoto"
              style={{width:"60px", height:"60px"}}
            /> */}
            <svg
              width="60"
              height="60"
              viewBox="0 0 60 60"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
            >
              <mask
                id="mask0_1_12"
                style={{ maskType: "alpha" }}
                maskUnits="userSpaceOnUse"
                x="0"
                y="0"
                width="60"
                height="60"
              >
                <circle cx="30" cy="30" r="30" fill="#C4C4C4" />
              </mask>
              <g mask="url(#mask0_1_12)">
                <rect width="60" height="60" fill="url(#pattern0)" />
              </g>
              <circle cx="49" cy="53" r="5.5" fill="#29CF00" stroke="white" />
              <defs>
                <pattern
                  id="pattern0"
                  patternContentUnits="objectBoundingBox"
                  width="1"
                  height="1"
                >
                  <use xlinkHref="#image0_1_12" transform="scale(0.00172414)" />
                </pattern>
                <image
                  id="image0_1_12"
                  width="580"
                  height="580"
                  xlinkHref={loggedInUser.thumbnail}
                />
              </defs>
            </svg>
          </div>
        </div>
        <div
          className={
            collapse
              ? "sideBar-remake collapse show navbar-collapse mt-3 text-nowrap"
              : "sideBar-remake collapse navbar-collapse mt-3 text-nowrap"
          }
          id="navbarSupportedContent"
        >
          <NavLink
            to="/dashboard/analytics"
            className={
              navName === "Dashboard" ? "mb-3 active px-3" : "mb-3 px-3"
            }
            id="hide_sideBar_remake"
            onClick={() => setCollapse(false)}
          >
            <i className="fa-solid fa-house"></i>
            <span>Dashboard</span>
          </NavLink>

          {/* <NavLink
            to="/dashboard/msme"
            className={navName === "MSME" ? "mb-3 active px-3" : "mb-3 px-3"}
            id="hide_sideBar_remake"
          >
            <i className="fa-solid fa-file-arrow-up"></i>
            <span> MSME</span>
          </NavLink> */}

          <NavLink
            to="/dashboard/coupon"
            className={navName === "Coupon" ? "mb-3 active px-3" : "mb-3 px-3"}
            id="hide_sideBar_remake"
            onClick={() => setCollapse(false)}
          >
            <i className="fas fa-ticket-alt"></i>
            <span>Coupon</span>
          </NavLink>
          <a
            className={
              navName === "Profile"
                ? "mb-3 active  px-3 cursorPointer"
                : "mb-3  px-3"
            }
            id="hide_sideBar_remake"
            onClick={() => setShowDropDown(!showDropDown)}
          >
            <i className="fa-solid fa-user-md"></i>
            <span>Profile</span>
            <i className="fa-solid fa-caret-down ml-3"></i>
          </a>
          <ul
            className={showDropDown ? "collapse show" : "collapse"}
            id="MSME_SubMenu"
            style={{ listStyleType: "none" }}
          >
            <li
              onClick={() => {
                setCollapse(false);
                history.push("/dashboard/change-password");
              }}
              className="cursorPointer"
            >
              {" "}
              <a className="cursorPointer">
                <span className="ml-4"> Change Password</span>
              </a>
            </li>
          </ul>
          <a
            onClick={logout}
            id="hide_sideBar_remake"
            className="mb-3 px-3 cursorPointer"
          >
            <i className="fa-solid fa-arrow-right-from-bracket"></i>
            <span>Log out</span>
          </a>
        </div>
      </div>
    </nav>
  );
};

export default observer(Navbar);
