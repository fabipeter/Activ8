import { FORM_ERROR } from "final-form";
import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import { Form as FinalForm, Field } from "react-final-form";
import { Link } from "react-router-dom";
import {
  createValidator,
  combineValidators,
  composeValidators,
  isRequired,
  isNumeric,
  hasLengthBetween,
} from "revalidate";
import { Header, Message, Button, Form } from "semantic-ui-react";
import { history } from "../../../..";
import ErrorMessage from "../../../../app/common/form/general/ErrorMessage";
import PasswordInput from "../../../../app/common/form/general/PasswordInput";
import TextInput from "../../../../app/common/form/general/TextInput";
import {
  CorporateLoginFormValues,
  CustomerLoginFormValues,
  IUserFormValues,
} from "../../../../app/models/user";
import { RootStoreContext } from "../../../../app/stores/rootStore";
import LoadingModal from "../../../general/LoadingModal";
import LoadingSpinner from "../../../general/LoadingSpinner";

const isValidEmail = createValidator(
  (message) => (value) => {
    if (value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      return message;
    }
  },
  "Invalid email address"
);

const validate = combineValidators({
  emailAddress: composeValidators(isRequired("Email Address"), isValidEmail)(),
  password: isRequired("Password"),
});

const CorporateLoginPage = () => {
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState("");
  const rootStore = useContext(RootStoreContext);
  const { isLoggedIn } = rootStore.commonStore;
  const token = window.localStorage.getItem("jwt");

  const [inputField, setInputField] = useState(new CustomerLoginFormValues());
  const [isPasswordShown, togglePasswordVisiblity] = useState(false);

  const {
    // sendOTP,
    validateUser,
    corporateLoginLoading,
    loginVerification,
    corporateLogin,
  } = rootStore.userStore;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(e.target.name, e.target.value);
    setInputField({ ...inputField, [e.target.name]: e.target.value });
    // setInputField(inputField);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(e.target.name, e.target.value);
    // console.log(inputField);

    setInputField({ ...inputField, [e.target.name]: btoa(e.target.value) });
    // setInputField(inputField);
  };
  const handleOTPChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(e.target.value)
    // if (isNaN(Number.parseInt(e.target.value))) return false;

    setOtp(e.target.value);
    // console.log(otp);

    setOtpError("");
  };

  useEffect(() => {
    if (token && isLoggedIn === "dHJ1ZXNlY3JldEtleT1BY3Rpdjg=") {
      history.push("/dashboard/analytics");
    }
  }, [token, isLoggedIn]);

  if (token) return <LoadingSpinner />;

  return (
    <div className="commonPageWrapper">
      {corporateLoginLoading && <LoadingModal />}
      <div className="pt-5 pl-5">
        <a className="cursorPointer" onClick={() => history.push("/")}>
          <div className="backNav">
            <img src="./images/blackArrow.svg" alt="" />
            <span>Back</span>
          </div>
        </a>
      </div>
      <div className="d-flex justify-content-center align-content-center pb-3">
        <FinalForm
          // className="col-lg-5 p-5"
          onSubmit={(values: IUserFormValues) =>
            loginVerification
              ? validateUser(values.emailAddress, otp).catch((error) =>
                  setOtpError(error)
                )
              : corporateLogin(inputField).catch((error) => ({
                  [FORM_ERROR]: error,
                }))
          }
          validate={validate}
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
                src="./images/ACTIV8 SVG (1).svg"
                className="mx-auto d-block mb-1 logoSize"
                alt="Alt Finance Logo"
              />
              <h1 className="text-center">Welcome back</h1>
              <p className="text-center">Log into your ACTIV8 account</p>
              <div className="form-group">
                <label htmlFor="registrationNumber">
                  Enter your Email Address
                </label>
                <Field
                  disabled={corporateLoginLoading || loginVerification}
                  type="text"
                  id="emailAddress"
                  className="form-control"
                  name="emailAddress"
                  component={TextInput}
                  placeholder="Email Address Here"
                  autoComplete="off"
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Enter your password *</label>

                <Field
                  disabled={corporateLoginLoading || loginVerification}
                  fieldClassName="loginPasswordField wrap-input100 validate-input"
                  className="FieldFormInput form-control"
                  iconClassName="password-icon"
                  name="password"
                  isPasswordShown={isPasswordShown}
                  togglePasswordVisiblity={togglePasswordVisiblity}
                  onChange={handlePasswordChange}
                  component={PasswordInput}
                  placeholder="Enter your password"
                  // type="password"
                  style={{ position: "relative" }}
                />
              </div>
              {!loginVerification && (
                <p className="float-right forgot_password ">
                  <a
                    className="cursorPointer"
                    onClick={() => history.push("/reset-password")}
                  >
                    Forgot Password?
                  </a>
                </p>
              )}
              {loginVerification && (
                <div className="py-3">
                  <label className="mt-2">Enter OTP</label>
                  <Field
                    disabled={corporateLoginLoading}
                    fieldClassName="loginUsernameField"
                    className="loginUsernameInput bg-light"
                    name="mobileToken"
                    // type="number"
                    component={TextInput}
                    placeholder="Enter mobile token here"
                    onChange={handleOTPChange}
                  />
                </div>
              )}
              {submitError && !dirtySinceLastSubmit && (
                <ErrorMessage
                  className="loginFormError"
                  error={submitError}
                  text="Invalid Email Address or Password"
                />
              )}
              {otp.toString().length == 6 && otpError && (
                <Message className="otpLoginErrorMessage" negative>
                  <p>{otpError}</p>
                </Message>
              )}
              <div className="form-group">
                <Button
                  id="longButton"
                  className="btn w-100 longButton px-3"
                  disabled={
                    loginVerification
                      ? otp.toString().length != 7
                      : (invalid && !dirtySinceLastSubmit) || pristine
                  }
                  loading={submitting}
                >
                  <div>Login</div>
                  <img
                    className="my-auto"
                    src="./images/whiteArrow.svg"
                    alt="continueArrow"
                  />
                </Button>
              </div>
              <p className="text-center grey-Medium_Bold-texts">
                New to the platform?{" "}
                <span className="purpleTexts sign_Up_Link">
                  <a onClick={() => history.push("/register")}>Sign Up</a>
                </span>
              </p>
            </Form>
          )}
        />
      </div>
    </div>
  );
};

export default observer(CorporateLoginPage);
