import React, { Fragment, useState } from "react";
import { Button } from "semantic-ui-react";
import { history } from "../../../../..";

const FirstCorporateStep = (props: any) => {
  const { setOptionState, setAccountType, next, back } = props;
  const [selected1, setSelected1] = useState(false);
  const [selected2, setSelected2] = useState(false);
  // const [selected3, setSelected3] = useState(false);

  const select1 = () => {
    setSelected1(!selected1);
    setSelected2(false);
    // setSelected3(false);
  };

  const select2 = () => {
    setSelected1(false);
    setSelected2(!selected2);
    // setSelected3(false);
  };
  return (
    <Fragment>
      <div className="commonPageWrapper">
        <div className="pt-5 pl-5">
          <a className="cursorPointer" onClick={() => setOptionState(0)}>
            <div className="backNav">
              <img src="./images/blackArrow.svg" alt="" />
              <span>Back</span>
            </div>
          </a>
        </div>
        <div className="d-flex justify-content-center align-content-center pt-5">
          <div className="col-lg-5 p-5 ">
            <img
              src="./images/AlternativeFinanceLogo.svg"
              className="mx-auto d-block mb-3"
              alt="Alt Finance Logo"
            />
            <div className="text-center spanTittle">
              Let us Onboard You on <br /> Alt Finance
            </div>
            <p className="text-center py-3">
              Which best describes your company?
            </p>
            <div className="row justify-content-around flex-wrap mx-5">
              <div className="form-group">
                <a
                  onClick={() => {
                    select1();
                    setAccountType(2);
                  }}
                >
                  <img
                    src={
                      selected1
                        ? "./images/businessName2.svg"
                        : "./images/businessName.svg"
                    }
                    alt="individual customer sign up"
                  />
                  <div className="text-center">Business Name</div>
                </a>
              </div>
              <div className="form-group">
                {" "}
                <a
                  onClick={() => {
                    select2();
                    setAccountType(3);
                  }}
                >
                  <img
                    src={
                      selected2
                        ? "./images/limitedLiability2.svg"
                        : "./images/limitedLiability.svg"
                    }
                    alt="individual customer sign up"
                  />
                  <div className="text-center">Limited Liability</div>
                </a>
              </div>
            </div>
            <div className="form-group mt-4 mx-sm-5">
              <Button
                id="longButton"
                className="w-100 longButton px-3 "
                disabled={!selected1 && !selected2}
                onClick={next}
              >
                <div className={!selected1 && !selected2 ? "" : ""}>
                  Continue
                </div>
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
                <a onClick={() => history.push("/login")}>Log in</a>
              </span>
            </p>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default FirstCorporateStep;
