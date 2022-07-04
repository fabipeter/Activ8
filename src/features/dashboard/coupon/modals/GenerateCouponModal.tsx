import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Modal, Button, Image, Header, Icon } from "semantic-ui-react";
import { RootStoreContext } from "../../../../app/stores/rootStore";

const GenerateCouponModal = (props: any) => {
  const { couponNumber, open, setOpen } = props;
  const rootStore = useContext(RootStoreContext);
  const { generateCoupon } = rootStore.couponStore;
  return (
    <Modal
      // onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button>Show Modal</Button>}
      id="couponModal"
    >
      <Modal.Header>Generate {couponNumber} Coupons?</Modal.Header>
      <Modal.Content image className="imageContent">
        <Icon name="ticket" size="massive" />
        <Modal.Description>
          <Header>Coupon Generation</Header>
          <p>Confirm the number of Coupons before proceeding</p>
          {/* <p>Is it okay to use this photo?</p> */}
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button color="black" onClick={() => setOpen(false)}>
          Cancel
        </Button>
        <Button
          content="Confirm"
          labelPosition="right"
          icon="checkmark"
          onClick={() => {
            // setOpen(false);
            generateCoupon(couponNumber);
          }}
          positive
        />
      </Modal.Actions>
    </Modal>
  );
};

export default observer(GenerateCouponModal);
