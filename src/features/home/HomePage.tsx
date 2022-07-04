import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Dropdown } from "semantic-ui-react";
import { history } from "../..";
import { RootStoreContext } from "../../app/stores/rootStore";
import LoadingModal from "../general/LoadingModal";
import LoadingSpinner from "../general/LoadingSpinner";

const HomePage = () => {
  const [collapse, setCollapse] = useState(false);
  const token = window.localStorage.getItem("jwt");
  const rootStore = useContext(RootStoreContext);
  const { logout, loginStatus, setLoginStatus } = rootStore.userStore;

  useEffect(() => {
    if (token) {
      setLoginStatus("true");
    }
  }, [token, setLoginStatus]);
  return (
    <div className="landing_Page">
      {loginStatus === "loading" && <LoadingModal />}
      <nav className="navbar navbar-expand-md navbar-light pr-4 pl-5 mt-lg-n4 ">
        <div className="container-fluid">
          <a
            className="navbar-brand d-md-inline d-none pr-5"
            onClick={() => history.push("/")}
          >
            <img src="/images/logo.svg" className=" logoSize" alt="" />
          </a>
          <button
            className="navbar-toggler"
            data-toggle="collapse"
            data-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
            onClick={() => setCollapse(!collapse)}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className={
              collapse
                ? "collapse navbar-collapse show"
                : "collapse navbar-collapse"
            }
            id="navbarNavAltMarkup"
          >
            <ul className="navbar-nav text-nowrap navi">
              <li className="nav-item">
                <a
                  className="nav-link active text-white px-3 mr-4 text-center pt-4"
                  onClick={() => history.push("/")}
                >
                  Home
                </a>
              </li>
              {/* <li className="nav-item">
                <a
                  className="nav-link mr-5 pt-4 "
                  onClick={() => history.push("/")}
                >
                  Why Us
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link mr-5 pt-4"
                  onClick={() => history.push("/")}
                >
                  How it Works
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link pt-4" onClick={() => history.push("/")}>
                  FAQs
                </a>
              </li> */}
            </ul>
          </div>

          <ul className="navbar-nav mr-5">
            <div
              className={
                collapse
                  ? "collapse navbar-collapse show mr-md-3"
                  : "collapse navbar-collapse mr-md-3"
              }
              id="navbarNavAltMarkup"
            >
              {loginStatus === "true" || loginStatus === "loading" ? (
                <div className="mr-5">
                  <span
                    id="navbarDropdown"
                    className=""

                    // role="button"
                    // dropdown-toggle-split
                    // data-toggle="dropdown"
                    // aria-expanded="false"
                  >
                    <img
                      src="./images/avatar2.png"
                      alt="user-photo"
                      className=" rounded-circle m-0 align-content-center "
                    />
                  </span>
                  <Dropdown pointing="top left" className="text-dark m-0">
                    <Dropdown.Menu>
                      <Dropdown.Item
                        as={Link}
                        to={"/dashboard/analytics"}
                        text="Dashboard"
                        icon="tasks"
                      />
                      <Dropdown.Item
                        onClick={logout}
                        text="Logout"
                        icon="power"
                      />
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              ) : (
                <li
                  className="nav-item "
                  style={{ cursor: "Pointer" }}
                  onClick={() => history.push("/login")}
                >
                  <a className="nav-link pr-5 ">Login</a>
                </li>
              )}
            </div>
            {loginStatus === "" && (
              <li className="nav-item">
                <button
                  className="register_button"
                  type="button"
                  onClick={() => history.push("/register")}
                >
                  Register
                </button>
              </li>
            )}
          </ul>
        </div>
      </nav>
      <section className="row mx-0 p-0 col-md-12 section_One mt-sm-3 pb-5">
        <div className="hero col-md justify-content-lg-start hero-text pt-md-5 pl-md-5 ">
          <h1 className="mt-5 pt-md-5 welcome_text pl-lg-4">
            <b>Activ8 LifeStyle Discounts.</b>
          </h1>
          <div className="welcome_para mb-4 mt-4 pl-lg-4">
            Join other Activ8 members who have direct access to thousands of
            discounts across every aspect of their daily life.
          </div>
          <div className=" d-flex justify-content-lg-start pl-lg-4">
            <button
              className="getStarted_button text-white d-flex justify-content-between"
              onClick={() => history.push("/login")}
            >
              Get started{" "}
              <span>
                <img src="./images/white_arrow.svg" alt="" />
              </span>
            </button>
          </div>
        </div>
        <div className="hero_picture col-md-6  hideContent">
          <img
            src="./images/ACTIV8 SVG 2-02.svg"
            alt=""
            className="d-block mx-auto img-fluid"
          />
        </div>
      </section>

      {/* <!-- *********Our Products section starts here --> */}
      <section className="col-md-12 pb-3">
        <div className="col-md-12  text-center py-5">
          <h1 className="welcome_text">
            <b>Our Partners</b>
          </h1>
        </div>
        <div className="mx-0 p-0 cards_wrapper">
          <div className="cards">
            <div className="card-body">
              <h1>Activ8</h1>
              <p className="mb-5">
                Let us Partner with your business and platform on{" "}
                <br className="d-none d-md-inline" /> Activ8
              </p>
              <div>
                <button
                  type="button"
                  className="products_button text-white"
                  onClick={() => history.push("/register")}
                >
                  Partner ?{" "}
                  <span>
                    <img src="./images/white_arrow.svg" alt="" />
                  </span>
                </button>
              </div>
            </div>
          </div>
          <div className="">
            <img src="./images/genesis.svg" alt="" className="card_images" />
          </div>
          <div className="cards">
            <div className="card-body">
              <div role="button">
                <h1>Activ8</h1>
                <p className=" ">
                  You've got whooping opportunity to expand{" "}
                  <br className="d-none d-md-inline" />
                  your business and cash flow with{" "}
                  <br className="d-none d-md-inline" />
                  Activ8
                </p>
              </div>
              <div>
                <button
                  type="button"
                  className="products_button text-white"
                  onClick={() => history.push("/register")}
                >
                  Partner ?{" "}
                  <span>
                    <img src="./images/white_arrow.svg" alt="" />
                  </span>
                </button>
              </div>
            </div>
          </div>

          <div className="">
            <img src="./images/boomplay.png" alt="" className="card_images" />
          </div>
          <div className="cards">
            <div className="card-body">
              <h1>Activ8</h1>
              <p className="mb-5">
                Let us Partner with your business and platform on{" "}
                <br className="d-none d-md-inline" /> Activ8
              </p>
              <div>
                <button
                  type="button"
                  className="products_button text-white"
                  onClick={() => history.push("/register")}
                >
                  Partner ?{" "}
                  <span>
                    <img src="./images/white_arrow.svg" alt="" />
                  </span>
                </button>
              </div>
            </div>
          </div>
          <div className="">
            <img src="./images/smile.svg" alt="" className="card_images" />
          </div>

          <div className="cards">
            <div className="card-body">
              <h1>Activ8</h1>
              <p className="mb-5">
                Let us Partner with your business and platform on{" "}
                <br className="d-none d-md-inline" /> Activ8
              </p>
              <div>
                <button
                  type="button"
                  className="products_button text-white"
                  onClick={() => history.push("/register")}
                >
                  Partner ?{" "}
                  <span>
                    <img src="./images/white_arrow.svg" alt="" />
                  </span>
                </button>
              </div>
            </div>
          </div>
          <div className="">
            <img src="./images/farm.png" alt="" className="card_images" />
          </div>
          <div className="cards">
            <div className="card-body">
              <h1>Activ8</h1>
              <p className="mb-5">
                Let us Partner with your business and platform on{" "}
                <br className="d-none d-md-inline" /> Activ8
              </p>
              <div>
                <button
                  type="button"
                  className="products_button text-white"
                  onClick={() => history.push("/register")}
                >
                  Partner ?{" "}
                  <span>
                    <img src="./images/white_arrow.svg" alt="" />
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-5 mb-5 d-flex justify-content-center align-content-center">
        <div className="container loan_rectangle mx-3">
          <div className="justify-content-center">
            <h3 className="text-center pt-5 font-weight-bold">
              Get started with Active8
            </h3>
            <p className="text-center pt-3 small">
              The smarter way is the discount way.
            </p>
            <div className="d-flex justify-content-center">
              <button
                className="loan_button text-white mt-2"
                onClick={() => history.push("/login")}
              >
                Get started{" "}
                <span>
                  <img src="./images/white_arrow.svg" alt="" />
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="row mx-0 p-0 col-md-12 mt-sm-3 pb-2">
        <div className="col-md-12  text-center py-5">
          <h1 className="welcome_text">
            <b>Why you should partner with us</b>
          </h1>
        </div>
        <div className="container-fluid d-flex justify-content-between flex-wrap">
          <div className="col-lg-5 d-none d-lg-inline mt-5 pl-5">
            <img src="./images/Black_lady2.svg" alt="" className="img-fluid" />
          </div>
          <div className="col-lg">
            <div className="d-flex justify-content-md-between flex-wrap text-lg-left p-md-0 standout_Boxes">
              <div className="col-md-5 mt-md-5 mb-md-5">
                <div className="">
                  <img
                    className="mb-3"
                    src="./images/flexibilityIcon.svg"
                    alt=""
                  />
                </div>

                <p className="font-weight-bold">Flexible Coupon Plan</p>
                <p className="small">
                  Easy yourself the stress of hectic discout plans, at ACTIV8 we
                  provide you with the most flexibility in order to meet your
                  discount needs.
                </p>
              </div>
              <div className="col-md-5 mt-5">
                <div>
                  <img
                    className="mb-3"
                    src="./images/interestIcon.svg"
                    alt=""
                  />
                </div>

                <p className="font-weight-bold">Interesting Subsidized deals</p>
                <p className="small">
                  We understand and care about your needs, thats why we have one
                  of the best interest rates for your discount plan.
                </p>
              </div>
            </div>
            <div className="d-flex justify-content-md-between flex-wrap text-lg-left p-md-0 standout_Boxes">
              <div className="col-md-5 mt-4">
                <div className="">
                  <img
                    className="mb-3"
                    src="./images/securityIcon.svg"
                    alt=""
                  />
                </div>

                <p className="font-weight-bold">Optimized security</p>
                <p className="small">
                  We are big on security so be rest assured that you are in the
                  right hands. Just enjoy the ride while we worry about your
                  security
                </p>
              </div>
              <div className="col-md-5 mt-4 d-none d-md-inline">
                <img src="./images/dottedBox.svg" alt="" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer container-fluid pt-5">
        <div className="mx-5 d-flex justify-content-between row pt-md-5">
          <div className="col-md-5 d-flex justify-content-md-start footer_assets mb-4">
            <div className="text-white py-2 pt-4 pr-3 text-md-center">
              Powered by
            </div>
            <a target="_blank" href="https://activ8-landing.vercel.app/">
              <img
                src="./images/ACTIV8 SVG (1).svg"
                className="logoSize"
                alt="ACTIV8 Logo"
              />
            </a>
          </div>
          <div className="col-md-6">
            <div className=" d-flex justify-content-md-end align-self-center footer_assets footer_icons">
              <a href="https://web.facebook.com/activ8.it">
                <img
                  src="./images/facebook_icon.svg"
                  alt="facebook"
                  className="mr-2"
                />
              </a>
              <a href="https://twitter.com/activ8_it">
                <img
                  src="./images/twitter_icon.svg"
                  alt="twitter"
                  className="mr-2"
                />
              </a>
              <a href="">
                <img
                  src="./images/linkedin_icon.svg"
                  alt="linkedin"
                  className="mr-2"
                />
              </a>
              <a href="">
                <img
                  src="./images/youtube_icon.svg"
                  alt="youtube"
                  className="mr-2"
                />
              </a>
              <a href="https://www.instagram.com/activ8.it/">
                <img
                  src="./images/instagram_icon.svg"
                  alt="instagram"
                  className="mr-2"
                />
              </a>
              <a href="">
                <img
                  src="./images/whatsapp_icon.svg"
                  alt="whatsapp"
                  className=""
                />
              </a>
            </div>
            <div className="d-flex justify-content-md-end footer_assets pt-3 text-center">
              <span>
                Copyright &copy;
                <span id="year"></span> ACTIV8. All rights reversed
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default observer(HomePage);
