import { Segment, Button, Header, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { observer } from "mobx-react-lite";
import React from "react";

const NotFound = () => {
  return (
    <Segment
    style={{marginTop:200}}
    placeholder>
      <Header icon>
        <Icon name="search" />
        Oops - we've looked everywhere but couldn't find this.
      </Header>
      <Segment.Inline>
        <Button as={Link} to="/" primary>
          Return to Home page
        </Button>
      </Segment.Inline>
    </Segment>
  );
};

export default observer(NotFound);
