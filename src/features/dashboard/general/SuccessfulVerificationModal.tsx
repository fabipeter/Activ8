import { observer } from "mobx-react-lite";
import React from "react";
import { Modal, Icon, Button } from "semantic-ui-react";
import { history } from "../../..";

const SuccessfulVerificationModal = (props: any) => {
  const { roleStatus, setStatus,exitUrl } = props;
  return (
    <Modal
      className="termsModal"
      id="successfulVerificationModal"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex={-1}
      aria-labelledby="successfulVerificationLabel"
      aria-hidden="true"
      open={roleStatus === "success"}
      //   onClose={() => setStatus("default")}
      size="mini"
    >
      <Modal.Content className="modal-content align-items-center  modalsizing">
        <div className="modal-header">
          <div className="modal-title">
            {/* <Icon name="check circle" color="green" />{" "}
            <span>No Record Found</span>
            <p className="ml-4">Please Check BVN details</p> */}
          </div>

          <Button
            className="close"
            style={{ background: "none", color: "red", padding: 0 }}
            data-dismiss="modal"
            aria-label="Close"
            onClick={(e) => {
              e.preventDefault();
              setStatus("default");
              history.push(`${exitUrl}`);
            }}
          >
            <span aria-hidden="true">&times;</span>
          </Button>
        </div>
        <div className="modal-body">
          <div id="greenBall"></div>
          <div className="my-4">
            <h4 style={{ fontWeight: "bolder" }}>Successful</h4>
          </div>

          <Button
            className="successfulVerificationButton"
            id="loginButton"
            onClick={(e) => {
              e.preventDefault();
              setStatus("default");
                history.push(`${exitUrl}`);
            }}
          >
            <div style={{ fontWeight: "normal" }}>Proceed</div>
          </Button>
        </div>
      </Modal.Content>
    </Modal>
  );
};

export default observer(SuccessfulVerificationModal);
