import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import { history } from "../../..";
import LoadingSpinner from "../../general/LoadingSpinner";
import CorporateLoginPage from "./steps/CorporateLoginPage";
import CustomerLoginPage from "./steps/CustomerLoginPage";
import LoginOptionPage from "./steps/LoginOptionPage";


const LoginPage = () => {
  const [option, setOption] = useState(0);
  const [step, setStep] = useState(1);

  const setOptionState = (value: number) => setOption(value);
  const token = window.localStorage.getItem("jwt");

  useEffect(() => {
    if (token) {
      history.push("/");
    }
  }, [token]);

  if (token) return <LoadingSpinner />;

  switch (option) {
    case 0:
      return <LoginOptionPage setOptionState={setOptionState} />;
    case 1:
      return <CustomerLoginPage setOptionState={setOptionState} />;
    case 2:
      return <CorporateLoginPage setOptionState={setOptionState} />;
    default:
      return (
        <LoginOptionPage
          setOptionState={setOptionState}
          setStep={setStep}
          step={step}
        />
      );
  }
};

export default observer(LoginPage);
