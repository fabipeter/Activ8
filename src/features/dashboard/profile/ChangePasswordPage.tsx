import { FORM_ERROR } from "final-form";
import { observer } from "mobx-react-lite";
import React, { useContext, useState } from "react";
import { Form as FinalForm, Field } from "react-final-form";
import {
  combineValidators,
  composeValidators,
  isRequired,
  hasLengthGreaterThan,
  createValidator,
  matchesField,
} from "revalidate";
import { Form, Button } from "semantic-ui-react";
import ErrorMessage from "../../../app/common/form/general/ErrorMessage";
import PasswordInput from "../../../app/common/form/general/PasswordInput";
import TextInput from "../../../app/common/form/general/TextInput";
import { ChangePasswordFormValues } from "../../../app/models/user";
import { RootStoreContext } from "../../../app/stores/rootStore";
import LoadingModal from "../../general/LoadingModal";
import SuccessfulMessageModal from "../general/SuccessfulMessageModal";

const ChangePasswordPage = () => {
  const rootStore = useContext(RootStoreContext);

  const [inputField, setInputField] = useState(new ChangePasswordFormValues());
  const [isPasswordShown, togglePasswordVisiblity] = useState(false);
  const [isConfirmPasswordShown, toggleConfirmPasswordVisiblity] =
    useState(false);

  const {
    // sendOTP,
    changePassword,
    setActivatedStatus,
    merchantRegistrationStatus,
    loginLoading,
    login,
  } = rootStore.userStore;

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
    newPassword: composeValidators(
      isRequired("Password"),
      hasLengthGreaterThan(7)("Password"),
      containsUppercaseLetter(),
      containsLowercaseLetter(),
      containsNumber()
      //   containsSpecialCharacter()
    )(),
    confirmPassword: matchesField(
      "newPassword",
      "Password"
    )({
      message: "Passwords do not match",
    }),
    temporaryPassword: isRequired("Temporary Password"),
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(e.target.name, e.target.value);
    setInputField({ ...inputField, [e.target.name]: btoa(e.target.value) });
    // setInputField(inputField);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(e.target.name, e.target.value);
    // console.log(inputField);

    setInputField({ ...inputField, [e.target.name]: btoa(e.target.value) });
    // setInputField(inputField);
  };

  const handleCloseModal = () => {
    setActivatedStatus("");
  };
  //   console.log(inputField);
  return (
    <div className="commonPageWrapper">
      {merchantRegistrationStatus === "loading" && <LoadingModal />}
      {merchantRegistrationStatus === "success" && (
        <SuccessfulMessageModal
          closeModal={handleCloseModal}
          message={"Password Changed Successfully"}
        />
      )}
      {/* <div className="pt-5 pl-5">
        <a className="cursorPointer" onClick={() => setOptionState(0)}>
          <div className="backNav">
            <img src="./images/blackArrow.svg" alt="" />
            <span>Back</span>
          </div>
        </a>
      </div> */}
      <div className="d-flex justify-content-center align-content-center pb-3">
        <FinalForm
          // className="col-lg-5 p-5"
          onSubmit={() =>
            changePassword(inputField).catch((error) => ({
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
                src="/images/ACTIV8 SVG (1).svg"
                className="mx-auto d-block mb-1 logoSize"
                alt="Alt Finance Logo"
              />
              <h4 className="text-center">Change Your Password</h4>
              <div className="form-group mt-3">
                <label htmlFor="temporaryPassword">
                  Enter Current Password *
                </label>
                <Field
                  // disabled
                  type="text"
                  id="temporaryPassword"
                  //   initialValue={inputField.temporaryPassword}
                  fieldClassName="m-0"
                  className="form-control"
                  name="temporaryPassword"
                  component={TextInput}
                  placeholder="Enter Temporary Password"
                  // autoComplete="off"
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="temporaryPassword">Enter New Password *</label>

                <Field
                  disabled={loginLoading}
                  fieldClassName="loginPasswordField wrap-input100 validate-input"
                  className="FieldFormInput form-control"
                  iconClassName="password-icon"
                  name="newPassword"
                  isPasswordShown={isPasswordShown}
                  togglePasswordVisiblity={togglePasswordVisiblity}
                  onChange={handlePasswordChange}
                  component={PasswordInput}
                  placeholder="Enter New password"
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

              <br />
              {submitError && !dirtySinceLastSubmit && (
                <ErrorMessage
                  className="loginFormError"
                  error={submitError}
                  text="Couldn't verify Process"
                />
              )}
              <div className="form-group">
                <Button
                  id="longButton"
                  className="btn w-100 longButton px-3"
                  disabled={(invalid && !dirtySinceLastSubmit) || pristine}
                  loading={submitting}
                >
                  <div>Submit</div>
                  <img
                    className="my-auto"
                    src="/images/whiteArrow.svg"
                    alt="continueArrow"
                  />
                </Button>
              </div>
            </Form>
          )}
        />
      </div>
    </div>
  );
};

export default observer(ChangePasswordPage);
