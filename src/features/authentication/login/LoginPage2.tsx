import { observer } from "mobx-react-lite";
import React, { Fragment, useState } from "react";
import { Button, Tab } from "semantic-ui-react";
import { history } from "../../..";
import CorporateLoginPane from "./steps2/CorporateLoginPane";
import CustomerLoginPane from "./steps2/CustomerLoginPane";

const LoginPage2 = () => {
  const [loaded, setloaded] = useState(false);
  const panes = [
    {
      menuItem: "Customer",
      render: () => <CustomerLoginPane />,
    },
    {
      menuItem: "Merchant",
      render: () => <CorporateLoginPane />,
    },
  ];
  return (
    <div>
      <Fragment>
        <div className="commonPageWrapper">
          <div className="pt-2 pl-5">
            <a className="cursorPointer" onClick={() => history.push("/")}>
              <div className="backNav">
                <img src="./images/blackArrow.svg" alt="" />
                <span>Back</span>
              </div>
            </a>
          </div>
          <div className="d-flex justify-content-center align-content-center pt-2">
            <div className="col-lg-5 px-5 py-2 ">
              <img
                src="./images/ACTIV8 SVG (1).svg"
                className="mx-auto d-block mb-1 logoSize"
                alt="Alt Finance Logo"
              />
              <div className="text-center spanTittle">Login on ACTIV8</div>
              <p className="text-center py-0">Which best describes you?</p>
            </div>
          </div>
          <Tab
            className="featuredStallsTabMenu vc_column_container "
            menu={{ secondary: true, pointing: true }}
            panes={panes}
          />
        </div>
      </Fragment>
    </div>
  );
};

export default observer(LoginPage2);
