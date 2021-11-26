import React from "react";
// Components
import Messages from "../Messages";
import NewMessageInput from "../NewMessageInput";
// Styles
import { Container, Title } from "./Chat.styles";

const Chat = ({ messages, onNewMessage }) => {
  return (
    <Container>
      <Title>Discuss</Title>
      <Messages messages={messages} />
      <NewMessageInput onNewMessage={onNewMessage} />
    </Container>
  );
};

export default Chat;
