import React, { useState } from "react";
// Styles
import { Container, Input } from "./NewMessageInput.styles";

const NewMessageInput = ({ onNewMessage }) => {
  const [newMessage, setNewMessage] = useState("");

  const onChangeNewMessage = (e) => {
    setNewMessage(e.target.value);
  };

  const onKeyDownNewMessage = (e) => {
    if (e.key === "Enter") {
      onNewMessage(newMessage);
      setNewMessage("");
    }
  };

  return (
    <Container>
      <Input
        type="text"
        placeholder="Message #general"
        value={newMessage}
        onChange={onChangeNewMessage}
        onKeyDown={onKeyDownNewMessage}
      />
    </Container>
  );
};

export default NewMessageInput;
