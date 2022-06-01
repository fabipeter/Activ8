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
  isNumeric,
  hasLengthGreaterThan,
  matchesField,
} from "revalidate";
import { Form, Button } from "semantic-ui-react";
import { history } from "../../../../..";
import OnboardingTextInput from "../../../../../app/common/form/customized/onboarding/OnboardingTextInput";
import SelectInput from "../../../../../app/common/form/customized/SelectInput";
import ErrorMessage from "../../../../../app/common/form/general/ErrorMessage";
import PasswordInput from "../../../../../app/common/form/general/PasswordInput";
import { statusValue } from "../../../../../app/common/options/StatusOptions";
import { RootStoreContext } from "../../../../../app/stores/rootStore";
import LoadingModal from "../../../../general/LoadingModal";

const SecondCorporateStep = (props: any) => {
  const { inputField, handleChange, next, back, setInputField, accountType } =
    props;
  const rootStore = useContext(RootStoreContext);
  const { register, setStatus, customerRegistrationStatus } =
    rootStore.customerStore;
  const [isPasswordShown, togglePasswordVisiblity] = useState(false);
  const [isConfirmPasswordShown, toggleConfirmPasswordVisiblity] =
    useState(false);
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(e.target.name, e.target.value);
    // console.log(inputField);

    setInputField({ ...inputField, [e.target.name]: e.target.value });
    // setInputField(inputField);
  };
  const isValidEmail = createValidator(
    (message) => (value) => {
      if (value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
        return message;
      }
    },
    "Invalid email address"
  );

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
    email: composeValidators(isRequired("Email Address"), isValidEmail)(),
    registrationNumber: composeValidators(
      isRequired("Registration Number"),
      isNumeric("Registration Number"),
      hasLengthBetween(
        11,
        11
      )({
        message: "Invalid",
      })
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
    if (customerRegistrationStatus === "success") {
      setStatus("");
      next();
    }
  }, [customerRegistrationStatus, setStatus, next]);

  return (
    <div className="commonPageWrapper">
      {customerRegistrationStatus === "loading" && <LoadingModal />}
      <div className="pt-2 pl-5">
        <a className="cursorPointer" onClick={() => history.push("/")}>
          <div className="backNav">
            <img src="./images/blackArrow.svg" alt="" />
            <span>Back</span>
          </div>
        </a>
      </div>
      <div className="d-flex justify-content-center align-content-center">
        <FinalForm
          // className="col-lg-5 p-5"
          onSubmit={(inputField) =>
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
            <Form className="col-lg-5 py-2 px-5" onSubmit={handleSubmit}>
              <img
                src="./images/ACTIV8 SVG (1).svg"
                className="mx-auto d-block mb-1 logoSize"
                alt="Alt Finance Logo"
              />
              <div className="text-center spanTittle">Let us Onboard You</div>
              <div className="text-center">
                Please input your <b>Email Address</b> and{" "}
                <b>Registration Number</b>
              </div>
              <div className="form-group mt-3">
                <label htmlFor="email">Email Address</label>
                <Field
                  type="text"
                  id="email"
                  initialValue={inputField.email}
                  fieldClassName="m-0"
                  className="form-control"
                  name="email"
                  component={OnboardingTextInput}
                  placeholder="Enter email address"
                  autoComplete="off"
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="bvnNo">Company Registration Number</label>
                <Field
                  type="text"
                  id="registrationNumber"
                  initialValue={inputField.registrationNumber}
                  className="form-control"
                  name="registrationNumber"
                  component={OnboardingTextInput}
                  placeholder="Enter Registration Number"
                  autoComplete="off"
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
                  text="Invalid Account Details"
                />
              )}
              <div className="form-group mt-5">
                <Button
                  id="longButton"
                  className="btn w-100 longButton px-3 "
                  disabled={(invalid && !dirtySinceLastSubmit) || pristine}
                  loading={submitting}
                >
                  <div>Continue</div>
                  <img
                    className="my-auto"
                    src="./images/whiteArrow.svg"
                    alt="continueArrow"
                  />
                </Button>
              </div>
              <p className="text-center grey-Medium_Bold-texts">
                Existing User?
                <span className="purpleTexts sign_Up_Link">
                  <a onClick={() => history.push("/login")}>Log in</a>
                </span>
              </p>
            </Form>
          )}
        />
      </div>
    </div>
  );
};

export default observer(SecondCorporateStep);
