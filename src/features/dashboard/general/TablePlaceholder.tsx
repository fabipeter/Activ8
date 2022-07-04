import { observer } from "mobx-react-lite";
import React, { Fragment } from "react";
import { Placeholder, Segment } from "semantic-ui-react";

const TablePlaceholder = () => {
  return (
    <Placeholder fluid>
      <Placeholder.Paragraph>
        <Placeholder.Line />
        <Placeholder.Line />
        <Placeholder.Line />
        <Placeholder.Line />
        <Placeholder.Line />
      </Placeholder.Paragraph>
      <Placeholder.Paragraph>
        <Placeholder.Line />
        <Placeholder.Line />
        <Placeholder.Line />
      </Placeholder.Paragraph>
    </Placeholder>
  );
};

export default observer(TablePlaceholder);
