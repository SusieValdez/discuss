import React from "react";
// Components
import Messages from "../Messages";
import NewMessageInput from "../NewMessageInput";
import UsersSidebar from "../UsersSidebar";
// Styles
import { Container, Title, Content, ChatArea } from "./Chat.styles";

const Chat = ({ activeChannelName, messages, onNewMessage, roles, users }) => {
  return (
    <Container>
      <Title>
        <h3>Discuss #{activeChannelName}</h3>
      </Title>
      <Content>
        <ChatArea>
          <Messages
            messages={messages.filter(
              (message) => message.channelName === activeChannelName
            )}
            users={users}
            roles={roles}
          />
          <NewMessageInput onNewMessage={onNewMessage} />
        </ChatArea>
        <UsersSidebar users={users} roles={roles} />
      </Content>
    </Container>
  );
};

export default Chat;
