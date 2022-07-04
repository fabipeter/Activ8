import { FORM_ERROR } from "final-form";
import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import { Form as FinalForm, Field } from "react-final-form";
import {
  createValidator,
  combineValidators,
  isRequired,
  composeValidators,
  hasLengthBetween,
  hasLengthGreaterThan,
  matchesField,
} from "revalidate";
import { Form, Button } from "semantic-ui-react";
import { history } from "../../..";
import OnboardingTextInput from "../../../app/common/form/customized/onboarding/OnboardingTextInput";
import ErrorMessage from "../../../app/common/form/general/ErrorMessage";
import PasswordInput from "../../../app/common/form/general/PasswordInput";
import TextInput from "../../../app/common/form/general/TextInput";
import {
  CorporateLoginFormValues,
  IResetPassword,
} from "../../../app/models/user";
import { RootStoreContext } from "../../../app/stores/rootStore";
import LoadingModal from "../../general/LoadingModal";
import LoadingSpinner from "../../general/LoadingSpinner";
import SuccessfulRegistrationModal from "../../general/SuccessfulRegistrationModal";

const ResetPasswordPage = () => {
  const [inputField, setInputField] = useState(new CorporateLoginFormValues());
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(e.target.name, e.target.value);
    setInputField({ ...inputField, [e.target.name]: e.target.value });
    // setInputField(inputField);
  };
  const token = window.localStorage.getItem("jwt");
  const rootStore = useContext(RootStoreContext);
  const { resetPassword, merchantRegistrationStatus, setActivatedStatus } =
    rootStore.userStore;

  const validate = combineValidators({
    registrationNumber: composeValidators(
      isRequired("Registration Number")
      // hasLengthBetween(
      //   8,
      //   8
      // )({
      //   message: "Invalid",
      // })
    )(),
  });
  useEffect(() => {
    if (token) {
      history.push("/dashboard/analytics");
    }
  }, [token]);

  if (token) return <LoadingSpinner />;
  console.log(inputField);
  return (
    <div className="commonPageWrapper">
      {merchantRegistrationStatus === "loading" && <LoadingModal />}
      {merchantRegistrationStatus === "success" && (
        <SuccessfulRegistrationModal
          closeModal={setActivatedStatus}
          message={
            "An Email has been sent to your Registered Email Address.Please Check!"
          }
        />
      )}
      <div className="pt-2 pl-5">
        <a className="cursorPointer" onClick={() => history.push("/login")}>
          <div className="backNav">
            <img src="./images/blackArrow.svg" alt="" />
            <span>Back</span>
          </div>
        </a>
      </div>
      <div className="d-flex justify-content-center align-content-center">
        <FinalForm
          // className=" p-5"
          onSubmit={(value: IResetPassword) =>
            resetPassword(value.registrationNumber).catch((error) => ({
              [FORM_ERROR]: error,
            }))
          }
          validate={validate}
          render={({ handleSubmit, submitting, invalid }) => (
            <Form className="col-lg-5 py-2 px-5" onSubmit={handleSubmit}>
              <img
                src="./images/ACTIV8 SVG (1).svg"
                className="mx-auto d-block mb-1 logoSize"
                alt="Alt Finance Logo"
              />
              <div className="text-center spanTittle">Reset Your Password</div>
              <div className="text-center mb-5">
                Please input <b>Your details</b>
              </div>

              <div className="form-group">
                <label htmlFor="bvnNo">Company Registration Number</label>
                <Field
                  type="text"
                  id="registrationNumber"
                  initialValue={inputField.registrationNumber}
                  className="form-control"
                  name="registrationNumber"
                  component={TextInput}
                  placeholder="Enter Registration Number"
                  autoComplete="off"
                  onChange={handleChange}
                />
              </div>
              <div className="form-group mt-5">
                <Button
                  id="longButton"
                  className="btn w-100 longButton px-3 "
                  disabled={invalid}
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
            </Form>
          )}
        />
      </div>
    </div>
  );
};

export default observer(ResetPasswordPage);
