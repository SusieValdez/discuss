import React from "react";
// Components
import Messages from "../Messages";
import NewMessageInput from "../NewMessageInput";
import UsersSidebar from "../UsersSidebar";
// Styles
import { Container, Title, Content, ChatArea } from "./Chat.styles";

const Chat = ({ messages, onNewMessage }) => {
  return (
    <Container>
      <Title>
        <h3>Discuss #General</h3>
      </Title>
      <Content>
        <ChatArea>
          <Messages messages={messages} />
          <NewMessageInput onNewMessage={onNewMessage} />
        </ChatArea>
        <UsersSidebar />
      </Content>
    </Container>
  );
};

export default Chat;
