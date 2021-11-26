import React from "react";
// Components
import Message from "../Message";
// Styles
import { Container } from "./Messages.styles.js";

const Messages = ({ messages }) => (
  <Container>
    {messages.map((message, i) => (
      <Message
        key={i}
        avatarUrl={message.avatarUrl}
        username={message.username}
        timestamp={message.timestamp}
        text={message.text}
      />
    ))}
  </Container>
);

export default Messages;
