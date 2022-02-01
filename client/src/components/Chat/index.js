import React, { useState } from "react";
// Components
import Messages from "../Messages";
import NewMessageInput from "../NewMessageInput";
import MiniUserProfileModal from "../MiniUserProfileModal";
import UsersSidebar from "../UsersSidebar";
// Styles
import { Container, Title, Content, ChatArea } from "./Chat.styles";
// Assets
import { ReactComponent as UsersListIcon } from "../../assets/user-friends-solid.svg";
import { ReactComponent as MySite } from "../../assets/question-circle-solid.svg";

const Chat = ({
  activeChannel,
  localUser,
  onNewMessage,
  roles,
  users,
  onTypingIndicatorChanged,
  onClickKick,
  onMessageEdit,
  onClickDeleteMessage,
}) => {
  const [userModalData, setUserModalData] = useState(undefined);

  const [showUsersSidebar, setShowUsersSidebar] = useState(true);
  const onClickShowUsersSidebar = () => {
    setShowUsersSidebar(!showUsersSidebar);
  };

  const openUserModal = (user) => (e) => {
    setUserModalData({ clickedTarget: e.target, user });
  };

  const closeUserModal = () => {
    setUserModalData(undefined);
  };

  const typingUsers = activeChannel.typingUsers
    .filter((userId) => userId !== localUser._id && users[userId] !== undefined)
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
        <div>
          <UsersListIcon onClick={onClickShowUsersSidebar} />
          <MySite />
        </div>
      </Title>
      <Content>
        <ChatArea>
          <Messages
            messages={activeChannel.messages}
            openUserModal={openUserModal}
            onMessageEdit={onMessageEdit}
            onClickDeleteMessage={onClickDeleteMessage}
          />
          <NewMessageInput
            onNewMessage={onNewMessage}
            onTypingIndicatorChanged={onTypingIndicatorChanged}
          />
          <div>
            <span className="typing-indicator">{typingUsersMessage}</span>
          </div>
        </ChatArea>
        {showUsersSidebar && (
          <UsersSidebar
            users={Object.values(users)}
            roles={roles}
            openUserModal={openUserModal}
            onClickKick={onClickKick}
          />
        )}
      </Content>
    </Container>
  );
};

export default Chat;
