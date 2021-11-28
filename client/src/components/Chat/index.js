import React from "react";
// Components
import Messages from "../Messages";
import NewMessageInput from "../NewMessageInput";
import UsersSidebar from "../UsersSidebar";
// Styles
import { Container, Title } from "./Chat.styles";

const Chat = ({ messages, onNewMessage }) => {
  return (
    <Container>
      <Title>
        <h3>Discuss #General</h3>
      </Title>
      <Messages messages={messages} />
      <NewMessageInput onNewMessage={onNewMessage} />
    </Container>
  );
};

export default Chat;
