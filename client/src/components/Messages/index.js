import React, { useRef } from "react";
import { useEffect } from "react";
// Components
import Message from "../Message";
// Styles
import { Container } from "./Messages.styles.js";

const Messages = ({
  messages,
  openUserModal,
  onMessageEdit,
  onClickDeleteMessage,
}) => {
  const messagesRef = useRef(null);
  useEffect(() => {
    const messages = messagesRef.current;
    messages?.scroll({
      top: messages.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);
  return (
    <Container ref={messagesRef}>
      {messages.map((message) => (
        <Message
          key={message._id}
          {...message}
          openUserModal={openUserModal}
          onMessageEdit={onMessageEdit(message._id)}
          onClickDeleteMessage={onClickDeleteMessage(message._id)}
        />
      ))}
    </Container>
  );
};

export default Messages;
