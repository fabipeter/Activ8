import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import { RootStoreContext } from "../../../../../app/stores/rootStore";
import LoadingModal from "../../../../general/LoadingModal";

const FourthCorporateStep = (props: any) => {
  const { inputField, handleChange, next, back, setTinInfo, setStep } = props;
  const rootStore = useContext(RootStoreContext);
  const {
    verifyTIN,
    verifySAFAccount,
    setStatus,
    customerActivatedStatus,
    setActivatedStatus,
  } = rootStore.customerStore;
  // const [success, setSuccess] = useState(true);
  useEffect(() => {
    let isCancelled = false;
    if (customerActivatedStatus === "") {
      verifyTIN(inputField)
        .then((response: {}) => {
          setTinInfo(response);
        })
        .catch();
      setActivatedStatus("default");
    } else if (customerActivatedStatus === "success") {
      setTimeout(() => {
        setActivatedStatus("default");
      }, 5000);
      setTimeout(() => {
        next();
      }, 7000);
    } else if (customerActivatedStatus === "failure") {
      setTimeout(() => {
        setActivatedStatus("default");
      }, 5000);
      setTimeout(() => {
        setStep(2);
      }, 7000);
    } else {
      setActivatedStatus("default");
    }
    return () => {
      isCancelled = true;
    };
  }, [
    customerActivatedStatus,
    verifyTIN,
    setTinInfo,
    inputField,
    setActivatedStatus,
    setStep,
    next,
  ]);

  return (
    <div className="commonPageWrapper">
      <div className="d-flex justify-content-center align-content-center mb-3 pt-5">
        {/* <LoadingModal /> */}
        <div className="col-lg-5 p-5">
          <img
            src="./images/AlternativeFinanceLogo.svg"
            className="mx-auto d-block mb-3"
            alt="Alt Finance Logo"
          />
          <span className="text-danger text-center d-block pb-3">
            Processing request
          </span>
          <div className="text-center mb-3">
            <h1>Validating Account & TIN</h1>
          </div>
          <h5 className="text-center">
            We are running accounts and tax identification number (TIN) check in
            order to <br className="d-none d-sm-inline" /> process your request.
            <span className=" font-weight-bold">Do not close this Browser</span>
          </h5>
          <div
            className="my-5 p-3 text-center"
            //   style={{ visibility: "hidden" }}
            id="hiddenSuccess"
          >
            {customerActivatedStatus === "success" ? (
              <img
                src="./images/successful.svg"
                alt="successful"
                className="d-block mx-auto "
              />
            ) : customerActivatedStatus === "failure" ? (
              <div>
                <h5>Could not verify Tax Identification Number</h5>
                <img
                  src="./images/failure.svg"
                  alt="successful"
                  className="d-block mx-auto "
                />
              </div>
            ) : (
              <div className="lds-spinner">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            )}
          </div>
          <h5 className=" font-weight-bold text-center mb-0">
            Do not close this Browser
          </h5>
        </div>
      </div>
    </div>
  );
};

export default observer(FourthCorporateStep);
