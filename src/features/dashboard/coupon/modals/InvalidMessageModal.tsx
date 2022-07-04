import { observer } from "mobx-react-lite";
import React from "react";

const InvalidMessageModal = (props: any) => {
  const { closeModal, message } = props;
  return (
    <div
      className="modal spinnerModal"
      id="alertModal"
      tabIndex={-1}
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
      data-backdrop="static"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-body">
            <div className="d-flex justify-content-between align-content-center">
              <div className="d-flex col-10 justify-content-start align-content-center pt-1">
                <img
                  src="/images/noticeIcon.svg"
                  alt="notice icon"
                  style={{ height: " 22px" }}
                />
                <h6 className="pl-2 m-0">Unsuccessful</h6>
              </div>
              {/* <!--  */}
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={() => {
                  closeModal();
                }}
              >
                <a
                  aria-hidden="true"
                  className="text-white small font-weight-bold"
                >
                  <i className="fa-solid fa-xmark"></i>
                </a>
              </button>
              {/* --> */}
            </div>
            <div className="d-sm-flex light-Medium-texts ml-5 pt-1">
              {message}
            </div>
            {/* <div className="pl-5 m-0 font-weight-bold">
              <a >Continue</a>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default observer(InvalidMessageModal);
