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
import { Form, Button, Grid, Label, Popup } from "semantic-ui-react";
import { history } from "../../..";
import OnboardingTextInput from "../../../app/common/form/customized/onboarding/OnboardingTextInput";
import SelectInput from "../../../app/common/form/customized/SelectInput";
import BasicFileInput from "../../../app/common/form/general/BasicFileInput";
import ErrorMessage from "../../../app/common/form/general/ErrorMessage";
import PasswordInput from "../../../app/common/form/general/PasswordInput";
import { statusValue } from "../../../app/common/options/StatusOptions";
import { CorporateLoginFormValues } from "../../../app/models/user";
import { RootStoreContext } from "../../../app/stores/rootStore";
import LoadingModal from "../../general/LoadingModal";
import LoadingSpinner from "../../general/LoadingSpinner";
import SuccessfulRegistrationModal from "../../general/SuccessfulRegistrationModal";

const CorporateRegisterForm = () => {
  const [inputField, setInputField] = useState(new CorporateLoginFormValues());
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(e.target.name, e.target.value);
    setInputField({ ...inputField, [e.target.name]: e.target.value });
    // setInputField(inputField);
  };
  const rootStore = useContext(RootStoreContext);
  const { register, merchantRegistrationStatus, setActivatedStatus } =
    rootStore.userStore;
  const [isPasswordShown, togglePasswordVisiblity] = useState(false);
  const [isConfirmPasswordShown, toggleConfirmPasswordVisiblity] =
    useState(false);
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(e.target.name, e.target.value);
    // console.log(inputField);

    setInputField({ ...inputField, [e.target.name]: btoa(e.target.value) });
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

  const thumbnailValidity = createValidator(
    (message) => (value) => {
      if (!inputField.thumbnail) {
        return message;
      }
    },
    "Required"
  );

  const validate = combineValidators({
    companyName: isRequired("Company Name"),
    emailAddress: composeValidators(
      isRequired("Email Address"),
      isValidEmail
    )(),
    phoneNumber: composeValidators(
      isRequired("Phone Number"),
      isNumeric("Phone Number"),
      hasLengthBetween(
        11,
        11
      )({
        message: "Invalid",
      })
    )(),
    registrationNumber: composeValidators(
      isRequired("Registration Number"),
      isNumeric("Registration Number"),
      hasLengthBetween(
        8,
        8
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
    thumbnail: composeValidators(thumbnailValidity)("Company Image"),
  });
  const token = window.localStorage.getItem("jwt");
  const { isLoggedIn } = rootStore.commonStore;

  useEffect(() => {
    if (token && isLoggedIn === "dHJ1ZXNlY3JldEtleT1BY3Rpdjg=") {
      history.push("/dashboard/analytics");
    }
  }, [token, isLoggedIn]);

  if (token) return <LoadingSpinner />;
  return (
    <div className="commonPageWrapper">
      {merchantRegistrationStatus === "loading" && <LoadingModal />}
      {merchantRegistrationStatus === "success" && (
        <SuccessfulRegistrationModal
          closeModal={setActivatedStatus}
          message={"Registration Successful"}
        />
      )}
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
          onSubmit={() =>
            register(inputField).catch((error) => ({
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
            <Form className="col-lg-7 py-2 px-5" onSubmit={handleSubmit}>
              <img
                src="./images/ACTIV8 SVG (1).svg"
                className="mx-auto d-block mb-1 logoSize"
                alt="Alt Finance Logo"
              />
              <div className="text-center spanTittle">Let us Onboard You</div>
              <div className="text-center mb-5">
                Please input your
                {/* <b>Email Address</b> and{" "} */} <b>Your details</b>
              </div>
              <div className="form-row">
                <div className="form-group col-md mt-3">
                  <label htmlFor="email">Company Name</label>
                  <Field
                    type="text"
                    id="companyName"
                    initialValue={inputField.companyName}
                    fieldClassName="m-0"
                    className="form-control"
                    name="companyName"
                    component={OnboardingTextInput}
                    placeholder="Enter Company Name"
                    autoComplete="off"
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group col-md mt-3">
                  <label htmlFor="email">Email Address</label>
                  <Field
                    type="text"
                    id="email"
                    initialValue={inputField.emailAddress}
                    fieldClassName="m-0"
                    className="form-control"
                    name="emailAddress"
                    component={OnboardingTextInput}
                    placeholder="Enter email address"
                    autoComplete="off"
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-md">
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
                <div className="form-group col-md">
                  <label htmlFor="bvnNo">Phone Number</label>
                  <Field
                    type="number"
                    id="phoneNumber"
                    initialValue={inputField.phoneNumber}
                    className="form-control"
                    name="phoneNumber"
                    component={OnboardingTextInput}
                    placeholder="Enter Phone Number"
                    autoComplete="off"
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-md">
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
                <div className="form-group col-md">
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
              </div>
              <div className="form-row">
                <div className="form-group col-md pop">
                  <Popup
                    on="click"
                    trigger={
                      <span className="show_Terms_Password ">
                        <p>
                          Your password should contain at least 8 characters{" "}
                        </p>
                        <Grid centered divided columns={2}>
                          <Grid.Column textAlign="left">
                            <Label
                              circular
                              color="purple"
                              className="minilabel"
                            />
                            <span>1 uppercase</span>
                          </Grid.Column>
                          <Grid.Column textAlign="left">
                            <Label circular color="red" className="minilabel" />
                            <span>1 lowercase</span>
                          </Grid.Column>
                        </Grid>
                        <Grid centered divided columns={2}>
                          <Grid.Column textAlign="left">
                            <Label
                              circular
                              color="green"
                              className="minilabel"
                            />
                            <span>1 number</span>
                          </Grid.Column>
                          <Grid.Column textAlign="left">
                            <Label
                              circular
                              color="blue"
                              className="minilabel"
                            />
                            <span>5 characters</span>
                          </Grid.Column>
                        </Grid>
                      </span>
                    }
                    // content="I am positioned to the right center"
                    position="right center"
                  />
                </div>
                <div className="form-group col-md">
                  <div className="mt-0 uploaded-box">
                    <label htmlFor="phoneNo" id="">
                      Company Image*
                    </label>
                    <div className="uploaded-img">
                      <img
                        src={
                          inputField.thumbnail
                            ? `data:image/jpeg;base64,${inputField.thumbnail}`
                            : "/images/add-single-img.svg"
                        }
                        alt="Company Image"
                      />
                    </div>
                    <div className="file  upload-btn">
                      {" "}
                      Upload Image
                      <Field
                        disabled={submitting}
                        name="thumbnail"
                        component={BasicFileInput}
                        toAccept="image/png, image/jpeg"
                        className="upload-input"
                        inputField={inputField}
                        setInputField={setInputField}
                      />
                    </div>
                  </div>
                </div>
              </div>
              {submitError && !dirtySinceLastSubmit && (
                <ErrorMessage
                  className="loginFormError"
                  error={submitError}
                  text="Invalid Account Details"
                />
              )}
              <div className="form-group  mt-5">
                <Button
                  id="longButton"
                  className="btn w-100 longButton "
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
                Existing User?{" "}
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

export default observer(CorporateRegisterForm);
