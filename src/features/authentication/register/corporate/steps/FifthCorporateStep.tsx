import { observer } from "mobx-react-lite";
import React from "react";
import { Form as FinalForm, Field } from "react-final-form";
import { Form, Button } from "semantic-ui-react";
import OnboardingTextInput from "../../../../../app/common/form/customized/onboarding/OnboardingTextInput";

const FifthCorporateStep = (props: any) => {
  const { next, setStep, tinInfo } = props;

  return (
    <div className="commonPageWrapper">
      {/* <LoadingModal /> */}
      <div className="pt-5 pl-5">
        <a className="cursorPointer" onClick={() => setStep(3)}>
          <div className="backNav">
            <img src="./images/blackArrow.svg" alt="" />
            <span>Back</span>
          </div>
        </a>
      </div>
      <div className="d-flex justify-content-center align-content-center">
        <FinalForm
          // className="col-lg-5 p-5"
          onSubmit={() => next()}
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
              <div className="text-center spanTittle">Verify your details </div>
              <div className="form-group mt-3">
                <label htmlFor="SAFnuban">Name</label>
                <Field
                  disabled
                  type="text"
                  id="SAFnuban"
                  initialValue={tinInfo.taxPayerName}
                  fieldClassName="m-0"
                  className="form-control"
                  name="safAccountNumber"
                  component={OnboardingTextInput}
                  placeholder=""
                  autoComplete="off"
                  // onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="tin">Tax Identification Number -(TIN)</label>
                <Field
                  disabled
                  type="text"
                  id="tin"
                  initialValue={tinInfo.tin}
                  fieldClassName="m-0"
                  className="form-control"
                  name="tin"
                  component={OnboardingTextInput}
                  placeholder="Enter Tax Identification Number"
                  autoComplete="off"
                  // onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="rc">RC/BN</label>
                <Field
                  disabled
                  type="text"
                  id="bvn"
                  initialValue={tinInfo.rcNumber}
                  fieldClassName="m-0"
                  className="form-control"
                  name="bvn"
                  component={OnboardingTextInput}
                  placeholder="Enter BVN"
                  autoComplete="off"
                  // onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Tax Office</label>
                <Field
                  disabled
                  type="text"
                  id="taxOffice"
                  initialValue={tinInfo.taxOfficeName}
                  fieldClassName="m-0"
                  className="form-control"
                  name="taxOffice"
                  component={OnboardingTextInput}
                  placeholder="Enter Tax Office"
                  autoComplete="off"
                  // onChange={handleChange}
                />
              </div>
              <div className="form-group mt-5">
                <Button
                  id="longButton"
                  className="btn w-100 longButton px-3 "
                  // disabled={invalid}
                  // onClick={next}
                >
                  <div>Continue</div>
                  <img
                    className="my-auto"
                    src="./images/whiteArrow.svg"
                    alt="continueArrow"
                  />
                </Button>
              </div>
              <p className="text-center grey-Small_Light-texts ">
                Kindly verify if the details are correct.
              </p>
            </Form>
          )}
        />
      </div>
    </div>
  );
};

export default observer(FifthCorporateStep);
