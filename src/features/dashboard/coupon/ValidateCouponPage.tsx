import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Button } from "semantic-ui-react";
import { RootStoreContext } from "../../../app/stores/rootStore";
import LoadingModal from "../../general/LoadingModal";
import SuccessfulMessageModal from "../general/SuccessfulMessageModal";
import InvalidMessageModal from "./modals/InvalidMessageModal";
import ValidateCouponModal from "./modals/ValidateCouponModal";

const ValidateCouponPage = () => {
  const rootStore = useContext(RootStoreContext);
  const {
    open,
    setOpen,
    couponActivatedStatus,
    setActivatedStatus,
    pageReset,
  } = rootStore.couponStore;
  // const [open, setOpen] = React.useState(false);
  const [couponCode, setCouponCode] = React.useState("");
  // console.log(couponCode);
  const handleResponse = () => {
    pageReset();
    setActivatedStatus("");
    setOpen(false);
  };
  return (
    <div className="pt-3">
      {couponActivatedStatus === "loading" && <LoadingModal />}
      {couponActivatedStatus === "success" && (
        <SuccessfulMessageModal
          closeModal={handleResponse}
          message="Coupons Validated Successfully"
        />
      )}
      {couponActivatedStatus === "failure" && (
        <InvalidMessageModal
          closeModal={handleResponse}
          message={"Coupon Validation Failed"}
        />
      )}
      {open && (
        <ValidateCouponModal
          open={open}
          setOpen={setOpen}
          couponCode={couponCode}
        />
      )}
      <div className="d-flex justify-content-center align-content-center pt-5">
        <div className="col-lg-5 px-3 pt-5 ">
          <div className="text-center spanTittle">Validate Coupon</div>
          <p className="text-center py-3">Input coupon code</p>
          <div className=" mx-sm-5">
            <div className="form-group">
              <label htmlFor="username">Enter Coupon Code</label>
              <input
                type="text"
                id="couponCode"
                className="form-control"
                placeholder="Coupon Code here"
                // value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
              />
            </div>
          </div>
          <div className="form-group mt-4 mx-sm-5">
            <Button
              id="longButton"
              className="w-100 longButton px-3 "
              disabled={couponCode === "" || couponCode.length < 18}
              onClick={() => setOpen(true)}
            >
              <div>Continue</div>
              <i className="fas fa-folder-plus"></i>
            </Button>
          </div>
          {/* <p className="text-center grey-Medium_Bold-texts">
              I have a username and password,
              <span className="purpleTexts sign_Up_Link">
                <a onClick={() => history.push("/login")}>Log in</a>
              </span>
            </p> */}
        </div>
      </div>
    </div>
  );
};

export default observer(ValidateCouponPage);
