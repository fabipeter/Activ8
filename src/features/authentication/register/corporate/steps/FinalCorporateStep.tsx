import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { history } from "../../../../..";

const FinalCorporateStep = (props: any) => {
  const [success, setSuccess] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setSuccess(true);
    }, 2000);
    setTimeout(() => {
      history.push("/login");
    }, 6000);
  }, [setSuccess]);
  return (
    <div style={{ display: "block" }} id="firstContent" className="mt-5">
      <div className="d-flex justify-content-center align-content-center mb-3">
        <form action="" className="col-lg-5 p-5 mt-3">
          <img
            src="./images/AlternativeFinanceLogo.svg"
            className="mx-auto d-block mb-3"
            alt="Alt Finance Logo"
          />
          <div className="text-center mb-3">
            <h1>Registration Successful</h1>
          </div>
          {/* <!-- <h5 className="text-center">We are processing your request request. <br>
					<span className=" font-weight-bold">Do not close this Browser</span>
				</h5> --> */}
          <div
            className="my-5 p-3 text-center"
            //   style={{ visibility: "hidden" }}
            id="hiddenSuccess"
          >
            {success ? (
              <div className="lds-spinner">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            ) : (
              <img
                src="./images/successful.svg"
                alt="successful"
                className="d-block mx-auto "
              />
            )}
          </div>
          <h5 className=" font-weight-bold text-center mb-0">
            Redirecting you to login page
          </h5>
        </form>
      </div>
    </div>
  );
};

export default observer(FinalCorporateStep);
