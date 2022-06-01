import { FORM_ERROR } from "final-form";
import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import { Form as FinalForm } from "react-final-form";
import OtpInput from "react-otp-input";
import { Form, Button, Loader } from "semantic-ui-react";
import ErrorMessage from "../../../../../app/common/form/general/ErrorMessage";
import { RootStoreContext } from "../../../../../app/stores/rootStore";
import LoadingModal from "../../../../general/LoadingModal";

const ThirdCorporateStep = (props: any) => {
  const { inputField, handleChange, next, back, setInputField,accountType } = props;
  const rootStore = useContext(RootStoreContext);
  const {
    verifyOTP,
    verifySAFAccount,
    setStatus,
    customerActivatedStatus,
    setActivatedStatus,
  } = rootStore.customerStore;

  const [otp, setOtp] = useState("");
  const [exportSpinner, setExportSpinner] = useState(false);
  const handleOTPChange = (otp: string) => setOtp(otp);
  //   console.log(otp);
  //   // console.log(sleep);

  const [counter, setCounter] = useState(300);
  // Prepend `0` for one digit numbers. For that the number has to be
  // converted to string, as numbers don't have length method
  const padTime = (time: any) => {
    return String(time).length === 1 ? `0${time}` : `${time}`;
  };

  const format = (time: any) => {
    // Convert seconds into minutes and take the whole part
    const minutes = Math.floor(time / 60);

    // Get the seconds left after converting minutes
    const seconds = time % 60;

    //Return combined values as string in format mm:ss
    return `${minutes}:${padTime(seconds)}`;
  };

  useEffect(() => {
    setStatus("");
    if (customerActivatedStatus === "success") {
      setActivatedStatus("");
      next();
    }
    let timer: any;
    if (counter > 0) {
      timer = setTimeout(() => setCounter((c) => c - 1), 1000);
    }

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [
    counter,
    setCounter,
    setStatus,
    setActivatedStatus,
    customerActivatedStatus,
    next,
  ]);

  return (
    <div className="commonPageWrapper" style={{ paddingTop: "2rem" }}>
      {customerActivatedStatus === "loading" && <LoadingModal />}
      <div className="pt-5 pl-5">
        <a
          className="cursorPointer"
          onClick={() => {
            setInputField({
              ...inputField,
              staffId: "",
            });
            back();
          }}
        >
          <div className="backNav">
            <img src="./images/blackArrow.svg" alt="" />
            <span>Back</span>
          </div>
        </a>
      </div>
      <div className="d-flex justify-content-center align-content-center">
        <FinalForm
          // className="col-lg-5 p-5"
          onSubmit={() =>
            verifyOTP(otp, inputField.email).catch((error) => ({
              [FORM_ERROR]: error,
            }))
          }
          render={({
            handleSubmit,
            submitting,
            submitError,
            invalid,
            pristine,
            dirtySinceLastSubmit,
          }) => (
            <Form className="col-lg-5 p-5" onSubmit={handleSubmit}>
              <img
                src="./images/AlternativeFinanceLogo.svg"
                className="mx-auto d-block mb-3"
                alt="Alt Finance Logo"
              />
              <div className="text-center mb-4">
                <span className="spanTittle">One Time Password (OTP)</span>{" "}
              </div>
              <p className="text-center">
                Kindly input the OTP sent to your BVN registered <br /> phone
                number to proceed
              </p>
              <label htmlFor="OTP" className="">
                OTP
              </label>
              <div className="form-group  OTP-wrapper">
                <OtpInput
                  value={otp}
                  onChange={handleOTPChange}
                  numInputs={6}
                  separator={<span className="mx-md-3">-</span>}
                  inputStyle={"OTP-input"}
                  isInputNum={true}
                />
              </div>
              {submitError && !dirtySinceLastSubmit && (
                <ErrorMessage
                  className="loginFormError"
                  error={submitError}
                  text="Invalid OTP"
                />
              )}
              <div className="form-group">
                <Button
                  className="btn w-100 longButton px-3 mt-4 continueBtn"
                  id="longButton"
                  disabled={otp.length < 6}
                  loading={submitting}
                >
                  <div>Verify OTP</div>
                  <img
                    className="my-auto"
                    src="./images/whiteArrow.svg"
                    alt="continueArrow"
                    data-toggle="modal"
                    data-target="#loaderModal"
                  />
                </Button>
              </div>
              <div className="text-center mb-2">
                OTP is valid for 5mins,{" "}
                <span>
                  {counter === 0 ? (
                    "Time over"
                  ) : (
                    <span>Countdown: {format(counter)}</span>
                  )}
                </span>
              </div>
              <div className="text-center grey-Medium-texts">
                Didn't receive OTP?
                <span
                  onClick={() => {
                    verifySAFAccount(inputField,accountType);
                    setTimeout(() => {
                      setExportSpinner(false);
                    }, 5000);
                    setCounter(300);
                  }}
                  className="purpleTexts sign_Up_Link otpLoader"
                >
                  {exportSpinner ? (
                    <Loader active size="mini" />
                  ) : (
                    <a onClick={() => setExportSpinner(true)}>
                      Click to resend OTP
                    </a>
                  )}
                </span>{" "}
                <br />
              </div>
            </Form>
          )}
        />
      </div>
    </div>
  );
};

export default observer(ThirdCorporateStep);
