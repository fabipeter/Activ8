import { observer } from "mobx-react-lite";
import React from "react";
import { Modal, Icon, Button } from "semantic-ui-react";
import { history } from "../../..";

const InvalidVerificationModal = (props: any) => {
  const { roleStatus, setStatus,exitUrl } = props;
  return (
    <Modal
      className="termsModal"
      id="invalidVerificationModal"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex={-1}
      aria-labelledby="invalidVerificationLabel"
      aria-hidden="true"
      open={roleStatus === "inelligible"}
      //   onClose={() => setStatus("default")}
      size="mini"
    >
      <Modal.Content className="modal-content align-items-center  modalsizing">
        <div className="modal-header">
          <div className="modal-title"></div>

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
            <h4 style={{ fontWeight: "bolder" }}>Unsuccessful</h4>
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

export default observer(InvalidVerificationModal);
