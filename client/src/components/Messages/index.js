import React from "react";
// Components
import Message from "../Message";
// Styles
import { Container, Content } from "./Messages.styles.js";

const Messages = ({ messages }) => (
  <Container>
    <Content>
      {messages.map((message, i) => (
        <Message
          key={i}
          avatarUrl={message.avatarUrl}
          username={message.username}
          timestamp={message.timestamp}
          text={message.text}
        />
      ))}
    </Content>
  </Container>
);

export default Messages;
