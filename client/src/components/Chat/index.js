import React, { useState } from "react";
// Components
import Messages from "../Messages";
import NewMessageInput from "../NewMessageInput";
import MiniUserProfileModal from "../MiniUserProfileModal";
import UsersSidebar from "../UsersSidebar";
// Styles
import { Container, Title, Content, ChatArea } from "./Chat.styles";

const Chat = ({ activeChannel, onNewMessage, roles, users }) => {
  const [userModalData, setUserModalData] = useState(undefined);

  const openUserModal = (user) => (e) => {
    setUserModalData({ clickedTarget: e.target, user });
  };

  const closeUserModal = () => {
    setUserModalData(undefined);
  };

  return (
    <Container>
      <MiniUserProfileModal closeModal={closeUserModal} data={userModalData} />
      <Title>
        <h3>Discuss #{activeChannel.name.toLowerCase()}</h3>
      </Title>
      <Content>
        <ChatArea>
          <Messages
            messages={activeChannel.messages}
            openUserModal={openUserModal}
          />
          <NewMessageInput onNewMessage={onNewMessage} />
        </ChatArea>
        <UsersSidebar
          users={users}
          roles={roles}
          openUserModal={openUserModal}
        />
      </Content>
    </Container>
  );
};

export default Chat;
