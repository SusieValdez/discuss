import React, { useEffect, useRef, useState } from "react";
// Styles
import { Container, Input } from "./NewMessageInput.styles";

const NewMessageInput = ({
  activeChannel,
  onNewMessage,
  onTypingIndicatorChanged,
}) => {
  const [newMessage, setNewMessage] = useState("");

  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current?.focus();
  }, [activeChannel._id]);

  const onChangeNewMessage = (e) => {
    const changedNewMessage = e.target.value;
    setNewMessage(changedNewMessage);
    onTypingIndicatorChanged(true);
  };

  const onKeyDownNewMessage = (e) => {
    if (newMessage.length > 0 && e.key === "Enter") {
      onNewMessage(newMessage);
      setNewMessage("");
      onTypingIndicatorChanged(false);
      e.preventDefault();
    }
  };

  return (
    <Container>
      <Input
        ref={inputRef}
        type="text"
        placeholder={`Message #${activeChannel.name}`}
        value={newMessage}
        onChange={onChangeNewMessage}
        onKeyDown={onKeyDownNewMessage}
      />
    </Container>
  );
};

export default NewMessageInput;
