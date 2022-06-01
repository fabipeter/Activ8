import { FORM_ERROR } from "final-form";
import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import { Form as FinalForm, Field } from "react-final-form";
import {
  createValidator,
  combineValidators,
  composeValidators,
  isRequired,
  hasLengthBetween,
  hasLengthGreaterThan,
  matchesField,
  isNumeric,
} from "revalidate";
import { Form, Button, Message } from "semantic-ui-react";
import OnboardingTextInput from "../../../../../app/common/form/customized/onboarding/OnboardingTextInput";
import ErrorMessage from "../../../../../app/common/form/general/ErrorMessage";
import PasswordInput from "../../../../../app/common/form/general/PasswordInput";
import { RootStoreContext } from "../../../../../app/stores/rootStore";
import LoadingModal from "../../../../general/LoadingModal";

const SixthCorporateStep = (props: any) => {
  const { inputField, handleChange, next, setInputField, back, accountType } =
    props;
  const rootStore = useContext(RootStoreContext);
  const {
    register,
    setActivatedStatus,
    setRegistrationStatus,
    customerActivatedStatus,
    customerRegistrationStatus,
  } = rootStore.customerStore;

  const [isPasswordShown, togglePasswordVisiblity] = useState(false);
  const [isConfirmPasswordShown, toggleConfirmPasswordVisiblity] =
    useState(false);
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(e.target.name, e.target.value);
    // console.log(inputField);

    setInputField({ ...inputField, [e.target.name]: e.target.value });
    // setInputField(inputField);
  };

  const containsUppercaseLetter = createValidator(
    (message) => (value) => {
      if (value && !/(?=.*?[A-Z])/.test(value)) {
        return message;
      }
    },
    "Password must include Upper case"
  );

  const containsLowercaseLetter = createValidator(
    (message) => (value) => {
      if (value && !/(?=.*?[a-z])/.test(value)) {
        return message;
      }
    },
    "Password must include lower case"
  );

  // const containsSpecialCharacter = createValidator(
  //   (message) => (value) => {
  //     if (value && !/(?=.*?[#?!@$%^&*-])/i.test(value)) {
  //       return message;
  //     }
  //   },
  //   "Password must contain special characters"
  // );

  const containsNumber = createValidator(
    (message) => (value) => {
      if (value && !/(?=.*?[0-9])/i.test(value)) {
        return message;
      }
    },
    "Password must include a number"
  );

  const validate = combineValidators({
    username: composeValidators(
      isRequired("Username"),
      hasLengthGreaterThan(4)("Username")
    )(),
    password: composeValidators(
      isRequired("Password"),
      hasLengthGreaterThan(7)("Password"),
      containsUppercaseLetter(),
      containsLowercaseLetter(),
      containsNumber()
      //   containsSpecialCharacter()
    )(),
    confirmPassword: matchesField(
      "password",
      "Password"
    )({
      message: "Passwords do not match",
    }),
  });

  useEffect(() => {
    setActivatedStatus("");
    if (customerRegistrationStatus === "success") {
      setActivatedStatus("");
      setRegistrationStatus("");
      next();
    } else {
      setActivatedStatus("");
    }
  }, [
    setActivatedStatus,
    setRegistrationStatus,
    customerRegistrationStatus,
    next,
  ]);

  return (
    <div className="commonPageWrapper">
      {customerRegistrationStatus === "loading" && <LoadingModal />}
      <div className="pt-5 pl-5">
        <a
          className="cursorPointer"
          onClick={() => {
            setRegistrationStatus("");
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
            register(inputField, accountType).catch((error) => ({
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
                src="./images/AlternativeFinanceLogo.svg"
                className="mx-auto d-block mb-3"
                alt="Alt Finance Logo"
              />
              <div className="text-center spanTittle">
                Create Username & Password{" "}
              </div>
              <div className="form-group mt-3">
                <label htmlFor="username">User Name (SAF Account Number)</label>
                <Field
                  type="text"
                  id="username"
                  initialValue={inputField.username}
                  fieldClassName="m-0"
                  className="form-control"
                  name="username"
                  component={OnboardingTextInput}
                  placeholder="Enter Username"
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <Field
                  //   disabled={loginLoading || loginVerification}
                  fieldClassName="loginPasswordField wrap-input100 validate-input"
                  className="FieldFormInput form-control"
                  iconClassName="password-icon"
                  name="password"
                  isPasswordShown={isPasswordShown}
                  togglePasswordVisiblity={togglePasswordVisiblity}
                  onChange={handlePasswordChange}
                  component={PasswordInput}
                  id="password"
                  placeholder="Enter password"
                  popup={true}
                  // type="password"
                  style={{ position: "relative" }}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Confirm Password</label>
                <Field
                  //   disabled={loginLoading || loginVerification}
                  fieldClassName="loginPasswordField wrap-input100 validate-input"
                  className="FieldFormInput form-control"
                  iconClassName="password-icon"
                  name="confirmPassword"
                  isPasswordShown={isConfirmPasswordShown}
                  togglePasswordVisiblity={toggleConfirmPasswordVisiblity}
                  onChange={handlePasswordChange}
                  component={PasswordInput}
                  placeholder="Confirm Password"
                  // type="password"
                  style={{ position: "relative" }}
                />
              </div>
              {submitError && !dirtySinceLastSubmit && (
                <ErrorMessage
                  className="loginFormError"
                  error={submitError}
                  text="Problem Submitting details"
                />
              )}
              {customerRegistrationStatus.includes("exist") &&
                !dirtySinceLastSubmit && (
                  <Message className="loginFormError" negative>
                    <p>{customerRegistrationStatus}</p>
                  </Message>
                )}
              <div className="form-group mt-5">
                <Button
                  id="longButton"
                  className="w-100 longButton px-3 "
                  disabled={invalid && !dirtySinceLastSubmit}
                  loading={submitting}
                >
                  <div>Create my account</div>
                  <img
                    className="my-auto"
                    src="./images/whiteArrow.svg"
                    alt="continueArrow"
                  />
                </Button>
              </div>
              <p className="text-center grey-Medium_Bold-texts">
                I have a username and password,
                <span className="purpleTexts sign_Up_Link">
                  {/* <a onClick={() => history.push("/login")}>Log in</a> */}
                </span>
              </p>
            </Form>
          )}
        />
      </div>
    </div>
  );
};

export default observer(SixthCorporateStep);
