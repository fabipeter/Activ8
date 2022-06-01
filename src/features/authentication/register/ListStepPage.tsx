import React, { useState } from "react";
import CorporateRegisterForm from "./corporate/CorporateRegisterForm";
import ListOptionPage from "./ListOptionPage";

const ListStepPage = () => {
  const [option, setOption] = useState(0);
  const [step, setStep] = useState(1);

  const setOptionState = (value: number) => setOption(value);

  switch (option) {
    case 0:
      return (
        <ListOptionPage
          setOptionState={setOptionState}
          setStep={setStep}
          step={step}
        />
      );
    // case 1:
    //   return <IndividualRegisterForm setOptionState={setOptionState} />;
    case 1:
      return <CorporateRegisterForm setOptionState={setOptionState} />;
    default:
      return (
        <ListOptionPage
          setOptionState={setOptionState}
          setStep={setStep}
          step={step}
        />
      );
  }
};

export default ListStepPage;
