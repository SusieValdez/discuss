import React, { useState } from "react";
// Components
import Messages from "../Messages";
import NewMessageInput from "../NewMessageInput";
import MiniUserProfileModal from "../MiniUserProfileModal";
import UsersSidebar from "../UsersSidebar";
// Styles
import { Container, Title, Content, ChatArea } from "./Chat.styles";

const Chat = ({
  activeChannel,
  localUser,
  onNewMessage,
  roles,
  users,
  onTypingIndicatorChanged,
}) => {
  const [userModalData, setUserModalData] = useState(undefined);

  const openUserModal = (user) => (e) => {
    setUserModalData({ clickedTarget: e.target, user });
  };

  const closeUserModal = () => {
    setUserModalData(undefined);
  };

  const typingUsers = activeChannel.typingUsers
    .filter((userId) => userId !== localUser._id)
    .map((userId) => users[userId].name);

  let typingUsersMessage = "";
  if (typingUsers.length > 2) {
    typingUsersMessage = "Multiple users are typing";
  } else if (typingUsers.length > 1) {
    typingUsersMessage = typingUsers.join(", ") + " are typing";
  } else if (typingUsers.length === 1) {
    typingUsersMessage = typingUsers[0] + " is typing";
  }

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
          <NewMessageInput
            onNewMessage={onNewMessage}
            onTypingIndicatorChanged={onTypingIndicatorChanged}
          />
          <div>
            <span className="typing-indicator">{typingUsersMessage}</span>
          </div>
        </ChatArea>
        <UsersSidebar
          users={Object.values(users)}
          roles={roles}
          openUserModal={openUserModal}
        />
      </Content>
    </Container>
  );
};

export default Chat;
