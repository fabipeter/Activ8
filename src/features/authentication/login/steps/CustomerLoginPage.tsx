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
} from "revalidate";
import { Header, Message, Button, Form } from "semantic-ui-react";
import { history } from "../../../..";
import ErrorMessage from "../../../../app/common/form/general/ErrorMessage";
import PasswordInput from "../../../../app/common/form/general/PasswordInput";
import TextInput from "../../../../app/common/form/general/TextInput";
import { CustomerLoginFormValues } from "../../../../app/models/user";
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
  emailAddress: composeValidators(isRequired("Email"), isValidEmail)(),
  password: isRequired("Password"),
});

const CustomerLoginPage = (props: any) => {
  const { setOptionState } = props;
  const rootStore = useContext(RootStoreContext);

  const [inputField, setInputField] = useState(new CustomerLoginFormValues());
  const [isPasswordShown, togglePasswordVisiblity] = useState(false);

  const {
    // sendOTP,
    validateUser,
    loginLoading,
    login,
  } = rootStore.userStore;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(e.target.name, e.target.value);
    setInputField({ ...inputField, [e.target.name]: e.target.value });
    // setInputField(inputField);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(e.target.name, e.target.value);
    // console.log(inputField);

    setInputField({ ...inputField, [e.target.name]: e.target.value });
    // setInputField(inputField);
  };

  return (
    <div className="commonPageWrapper">
      {loginLoading && <LoadingModal />}
      <div className="pt-5 pl-5">
        <a className="cursorPointer" onClick={() => setOptionState(0)}>
          <div className="backNav">
            <img src="./images/blackArrow.svg" alt="" />
            <span>Back</span>
          </div>
        </a>
      </div>
      <div className="d-flex justify-content-center align-content-center pb-3">
        <FinalForm
          // className="col-lg-5 p-5"
          onSubmit={() =>
            login(inputField).catch((error) => ({
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
                <label htmlFor="email">Enter your email *</label>
                <Field
                  disabled={loginLoading}
                  type="text"
                  id="emailAddress"
                  className="form-control"
                  name="emailAddress"
                  component={TextInput}
                  placeholder="Enter email address"
                  autoComplete="off"
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Enter your password *</label>

                <Field
                  disabled={loginLoading}
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
              <p className="float-right forgot_password">
                <a>Forgot Password?</a>
              </p>{" "}
              <br />
              {submitError && !dirtySinceLastSubmit && (
                <ErrorMessage
                  className="loginFormError"
                  error={submitError}
                  text="Invalid username or password"
                />
              )}
              <div className="form-group">
                <Button
                  id="longButton"
                  className="btn w-100 longButton px-3"
                  disabled={(invalid && !dirtySinceLastSubmit) || pristine}
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
              {/* <p className="text-center grey-Medium_Bold-texts">
                New to the platform?
                <span className="purpleTexts sign_Up_Link">
                  <a onClick={() => history.push("/register")}>Sign Up</a>
                </span>
              </p> */}
            </Form>
          )}
        />
      </div>
    </div>
  );
};

export default observer(CustomerLoginPage);
