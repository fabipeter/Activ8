import { observer } from "mobx-react-lite";
import React, { Fragment, useContext, useEffect, useState } from "react";
import { RootStoreContext } from "../../../app/stores/rootStore";
import CardTrayPlaceholder from "../general/CardTrayPlaceholder";
import FailedRedemptions from "./redemptions/FailedRedemptions";
import SuccessfulRedemptions from "./redemptions/SuccessfulRedemptions";
import TotalRedemptions from "./redemptions/TotalRedemptions";

const DashboardAnalytics = () => {
  const [redemption, setRedemption] = useState("Total");
  const rootStore = useContext(RootStoreContext);
  const {
    generatedCouponList,
    identityCodeList,
    couponStatus,
    setStatus,
    getGeneratedList,
  } = rootStore.dashStore;

  useEffect(() => {
    let isCancelled = false;
    if (generatedCouponList.length === 0 && couponStatus !== "success") {
      getGeneratedList();
    }
    return () => {
      isCancelled = true;
    };
  }, []);

  return (
    <Fragment>
      {(couponStatus === "loading" || couponStatus === "") && (
        <div className="mt-4">
          <CardTrayPlaceholder />
        </div>
      )}
      {couponStatus !== "loading" && couponStatus !== "" && (
        <div className=" mt-4 cards-tray row mx-auto px-0 col-md-12">
          <a
            onClick={() => setRedemption("Total")}
            className={
              redemption === "Total"
                ? "col-md text-nowrap card-box1 active"
                : "col-md text-nowrap card-box1"
            }
          >
            <div className="d-flex justify-content-between">
              <span className="number-Of-requests">
                {generatedCouponList.length}
              </span>
              <img src="/images/inbound-icon.svg" alt="" />
            </div>
            <h5>Total Redemptions</h5>
            <span className="text-success">
              {
                generatedCouponList.filter((coupon) => {
                  return (
                    coupon.dateCreated &&
                    new Date(coupon.dateCreated).getDate() ===
                      new Date().getDate() &&
                    new Date(coupon.dateCreated).getMonth() ===
                      new Date().getMonth() &&
                    new Date(coupon.dateCreated).getFullYear() ===
                      new Date().getFullYear()
                  );
                }).length
              }{" "}
              New Redemptions
            </span>
            <span> Today</span>
          </a>

          {/* <a
          href="dashboard-pending-request.html"
          className="col-md text-nowrap card-box2"
        >
          <div className="d-flex justify-content-between">
            <span className="number-Of-requests">680</span>
            <img src="/images/inbound-icon.svg" alt="" />
          </div>
          <h5 className="">Pending requests</h5>
          <span className="text-success">5 New Pending Request</span>
          <span> Today</span>
        </a> */}

          <a
            onClick={() => setRedemption("Successful")}
            className={
              redemption === "Successful"
                ? "col-md text-nowrap card-box3 active"
                : "col-md text-nowrap card-box3"
            }
          >
            <div className="d-flex justify-content-between">
              <span className="number-Of-requests">
                {
                  generatedCouponList.filter((coupon) => {
                    return (
                      coupon.isUsed &&
                      new Date(coupon.dateCreated).getDate() ===
                        new Date().getDate() &&
                      new Date(coupon.dateCreated).getMonth() ===
                        new Date().getMonth() &&
                      new Date(coupon.dateCreated).getFullYear() ===
                        new Date().getFullYear()
                    );
                  }).length
                }
              </span>
              <img src="/images/outbound-icon.svg" alt="" />
            </div>
            <h5 className="">Successful Redemptions</h5>
            <span className="text-success">
              {
                generatedCouponList.filter((coupon) => {
                  return coupon.isUsed;
                }).length
              }{" "}
              Successful Redemptions
            </span>
            <span> Today</span>
          </a>

          <a
            onClick={() => setRedemption("Available")}
            className={
              redemption === "Available"
                ? "col-md text-nowrap card-box4 active"
                : "col-md text-nowrap card-box4"
            }
          >
            <div className="d-flex justify-content-between">
              <span className="number-Of-requests2">
                {
                  generatedCouponList.filter((coupon) => {
                    return !coupon.isUsed;
                  }).length
                }
              </span>
              <img src="/images/declined-icon.svg" alt="" />
            </div>
            <h5 className="">Available Redemptions</h5>
            <span className="text-danger">
              {
                generatedCouponList.filter((coupon) => {
                  return (
                    !coupon.isUsed &&
                    new Date(coupon.dateCreated).getDate() ===
                      new Date().getDate() &&
                    new Date(coupon.dateCreated).getMonth() ===
                      new Date().getMonth() &&
                    new Date(coupon.dateCreated).getFullYear() ===
                      new Date().getFullYear()
                  );
                }).length
              }{" "}
              Available Redemptions
            </span>
            <span> Today</span>
          </a>
        </div>
      )}
      {couponStatus !== "loading" && couponStatus !== "" && (
        <h5 className=" table-caption font-weight-bolder mt-4">
          {" "}
          {redemption} redemptions
        </h5>
      )}
      {redemption === "Total" && <TotalRedemptions />}
      {redemption === "Successful" && <SuccessfulRedemptions />}
      {redemption === "Available" && <FailedRedemptions />}
    </Fragment>
  );
};

export default observer(DashboardAnalytics);
