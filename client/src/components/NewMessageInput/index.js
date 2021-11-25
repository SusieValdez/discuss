import React from "react";
// Styles
import { Container, Input } from "./NewMessageInput.styles";

const NewMessageInput = () => {
  return (
    <Container>
      <Input type="text" placeholder="Message #general" />
    </Container>
  );
};

export default NewMessageInput;
