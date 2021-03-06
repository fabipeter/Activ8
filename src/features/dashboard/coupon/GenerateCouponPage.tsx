import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Button } from "semantic-ui-react";
import { RootStoreContext } from "../../../app/stores/rootStore";
import LoadingModal from "../../general/LoadingModal";
import SuccessfulMessageModal from "../general/SuccessfulMessageModal";
import GenerateCouponModal from "./modals/GenerateCouponModal";
import InvalidMessageModal from "./modals/InvalidMessageModal";

const GenerateCouponPage = () => {
  const rootStore = useContext(RootStoreContext);
  const {
    open,
    setOpen,
    couponActivatedStatus,
    setActivatedStatus,
    pageReset,
  } = rootStore.couponStore;
  // const [open, setOpen] = React.useState(false);
  const [couponNumber, setCouponNumber] = React.useState(0);
  // console.log(couponActivatedStatus);
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
          message="Coupons Generated Successfully"
        />
      )}
      {couponActivatedStatus === "failure" && (
        <InvalidMessageModal
          closeModal={handleResponse}
          message={"Coupon Generation Failed"}
        />
      )}
      {open && (
        <GenerateCouponModal
          open={open}
          setOpen={setOpen}
          couponNumber={couponNumber}
        />
      )}
      <div className="d-flex justify-content-center align-content-center pt-5">
        <div className="col-lg-5 px-3 pt-5 ">
          <div className="text-center spanTittle">Generate Your Coupons</div>
          <p className="text-center py-3">Input the total number of coupons</p>
          <div className=" mx-sm-5">
            <div className="form-group">
              <label htmlFor="couponNumber">Enter Number of Coupons</label>
              <input
                type="number"
                id="couponNumber"
                className="form-control"
                placeholder="Coupon Number here"
                // value={couponNumber}
                onChange={(e) =>
                  setCouponNumber(Number.parseInt(e.target.value))
                }
              />
            </div>
          </div>
          <div className="form-group mt-4 mx-sm-5">
            <Button
              id="longButton"
              className="w-100 longButton px-3 "
              disabled={couponNumber <= 0}
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

export default observer(GenerateCouponPage);
