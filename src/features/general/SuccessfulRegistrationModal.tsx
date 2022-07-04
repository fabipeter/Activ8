import { observer } from "mobx-react-lite";
import React from "react";
import { history } from "../..";

const SuccessfulRegistrationModal = (props: any) => {
  const { closeModal, message } = props;
  return (
    <div
      className="modal alert_modal3 fade animate__fadeInDownBig spinnerModal"
      id="alert_modal3"
      tabIndex={-1}
      role="dialog"
      aria-labelledby="alert_modal3"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-xl" role="document">
        <div className=" modal-content">
          <div className=" modal-header">
            {/* <!-- <h5 className="modal-title">Modal Title</h5> --> */}
            <div>
              <small>
                {" "}
                <span>
                  <img src="/images/info_icon2.svg" alt="" />
                </span>
                Successful
              </small>
            </div>
            <button
              className="close text-white"
              data-dismiss="modal"
              onClick={() => {
                closeModal(""), history.push("/login");
              }}
            >
              &times;
            </button>
          </div>
          <div className="modal-body mt-n4">
            <p>{message}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default observer(SuccessfulRegistrationModal);
