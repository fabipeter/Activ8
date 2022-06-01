import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Button } from "semantic-ui-react";
import { RootStoreContext } from "../../../app/stores/rootStore";
import LoadingModal from "../../general/LoadingModal";
import GenerateCouponModal from "./GenerateCouponModal";

const GenerateCouponPage = () => {
  const rootStore = useContext(RootStoreContext);
  const { open, setOpen, couponActivatedStatus, generateCoupon } =
    rootStore.couponStore;
  // const [open, setOpen] = React.useState(false);
  const [couponNumber, setCouponNumber] = React.useState(0);
  return (
    <div className="pt-3">
      {couponActivatedStatus === "loading" && <LoadingModal />}
      {open && (
        <GenerateCouponModal
          open={open}
          setOpen={setOpen}
          generateCoupon={generateCoupon}
          couponNumber={couponNumber}
        />
      )}
      <div className="d-flex justify-content-center align-content-center pt-5">
        <div className="col-lg-5 px-3 pt-5 ">
          <div className="text-center spanTittle">Generate Your Coupons</div>
          <p className="text-center py-3">Input the total number of coupons</p>
          <div className=" mx-sm-5">
            <div className="form-group">
              <label htmlFor="username">Enter Number of Coupons</label>
              <input
                type="number"
                id="username"
                className="form-control"
                placeholder="Coupon Number here"
                // value={couponNumber}
                // onChange={()}
              />
            </div>
          </div>
          <div className="form-group mt-4 mx-sm-5">
            <Button
              id="longButton"
              className="w-100 longButton px-3 "
              //   disabled={!selected1 && !selected2}
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
