import React, { Fragment, useState } from "react";
import { Button } from "semantic-ui-react";
import { history } from "../../..";

const ListOptionPage = (props: any) => {
  const { setOptionState, setOpen, setStep } = props;
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
          <a className="cursorPointer" onClick={() => history.push("/")}>
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
            <p className="text-center py-3">Which best describes you?</p>
            <div className="row justify-content-around flex-wrap mx-5">
              <div className="form-group">
                <a onClick={select1}>
                  <img
                    src={
                      selected1
                        ? "./images/individualCustomer2.svg"
                        : "./images/individualCustomer.svg"
                    }
                    alt="individual customer sign up"
                  />
                  <div className="text-center">Individual</div>
                </a>
              </div>
              <div className="form-group">
                {" "}
                <a onClick={select2}>
                  <img
                    src={
                      selected2
                        ? "./images/corporateCustomer2.svg"
                        : "./images/corporateCustomer.svg"
                    }
                    alt="individual customer sign up"
                  />
                  <div className="text-center">Corporate</div>
                </a>
              </div>
            </div>
            <div className="form-group mt-4 mx-sm-5">
              <Button
                id="longButton"
                className="w-100 longButton px-3 "
                type="button"
                disabled={!selected1 && !selected2}
                onClick={
                  selected1 ? () => setOptionState(1) : () => setOptionState(2)
                }
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

export default ListOptionPage;
