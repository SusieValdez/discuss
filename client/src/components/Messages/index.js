import React, { useRef } from "react";
import { useEffect } from "react";
// Components
import Message from "../Message";
// Styles
import { Container } from "./Messages.styles.js";

const Messages = ({ messages }) => {
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
      {messages.map((message, i) => (
        <Message key={i} {...message} />
      ))}
    </Container>
  );
};

export default Messages;
