import { observer } from "mobx-react-lite";
import React, { Fragment, useContext, useState } from "react";
import { CustomerRegistrationForm } from "../../../../app/models/customer";
import ListOptionPage from "../ListOptionPage";
import FifthCorporateStep from "./steps/FifthCorporateStep";
import FinalCorporateStep from "./steps/FinalCorporateStep";
import FirstCorporateStep from "./steps/FirstCorporateStep";
import FourthCorporateStep from "./steps/FourthCorporateStep";
import SecondCorporateStep from "./steps/SecondCorporateStep";
import SixthCorporateStep from "./steps/SixthCorporateStep";
import ThirdCorporateStep from "./steps/ThirdCorporateStep";

const CorporateRegisterForm = (props: any) => {
  const { setOptionState } = props;
  const [inputField, setInputField] = useState(new CustomerRegistrationForm());
  const [step, setStep] = useState(1);
  const [accountType, setAccountType] = useState(0);
  const [tinInfo, setTinInfo] = useState({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(e.target.name, e.target.value);
    setInputField({ ...inputField, [e.target.name]: e.target.value });
    // setInputField(inputField);
  };

  // Proceed to next step
  const nextStep = () => {
    return setStep(step + 1);
  };
  // Go back to prev step
  const prevStep = () => {
    return setStep(step - 1);
  };

  // console.log(accountType);
  // console.log(inputField);

  switch (step) {
    case 0:
      return (
        <CorporateRegisterForm
          setOptionState={setOptionState}
          setStep={setStep}
        />
      );

    // case 1:
    //   return (
    //     <Fragment>
    //       <FirstCorporateStep
    //         inputField={inputField}
    //         setInputField={setInputField}
    //         setOptionState={setOptionState}
    //         setStep={setStep}
    //         next={nextStep}
    //         setAccountType={setAccountType}
    //       />
    //     </Fragment>
    //   );
    case 1:
      return (
        <Fragment>
          <SecondCorporateStep
            inputField={inputField}
            setInputField={setInputField}
            setOptionState={setOptionState}
            setStep={setStep}
            handleChange={handleChange}
            back={prevStep}
            next={nextStep}
            accountType={accountType}
          />
        </Fragment>
      );

    // case 3:
    //   return (
    //     <ThirdCorporateStep
    //       inputField={inputField}
    //       setInputField={setInputField}
    //       handleChange={handleChange}
    //       back={prevStep}
    //       next={nextStep}
    //       accountType={accountType}
    //     />
    //   );

    // case 4:
    //   return (
    //     <FourthCorporateStep
    //       inputField={inputField}
    //       setInputField={setInputField}
    //       handleChange={handleChange}
    //       back={prevStep}
    //       next={nextStep}
    //       setStep={setStep}
    //       setTinInfo={setTinInfo}
    //     />
    //   );

    // case 5:
    //   return (
    //     <FifthCorporateStep
    //       inputField={inputField}
    //       setInputField={setInputField}
    //       handleChange={handleChange}
    //       setStep={setStep}
    //       next={nextStep}
    //       tinInfo={tinInfo}
    //     />
    //   );

    // case 6:
    //   return (
    //     <SixthCorporateStep
    //       inputField={inputField}
    //       setInputField={setInputField}
    //       handleChange={handleChange}
    //       back={prevStep}
    //       next={nextStep}
    //       accountType={accountType}
    //     />
    //   );

    case 2:
      return (
        <FinalCorporateStep
          inputField={inputField}
          setInputField={setInputField}
          handleChange={handleChange}
          back={prevStep}
          next={nextStep}
        />
      );

    default:
      return (
        <ListOptionPage setOptionState={setOptionState} setStep={setStep} />
      );
  }
};

export default observer(CorporateRegisterForm);
