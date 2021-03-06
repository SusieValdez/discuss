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
import Tooltip from "../../ui/Tooltip";
import { isUserInServer } from "../../utils";

const Chat = ({
  server,
  activeChannel,
  localUser,
  onNewMessage,
  roles,
  users,
  userMap,
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

  if (!activeChannel) {
    return <></>;
  }

  const typingUsers = activeChannel.typingUsers
    .filter(
      (userId) => userId !== localUser._id && userMap[userId] !== undefined
    )
    .map((userId) => userMap[userId].name);

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
      <MiniUserProfileModal
        closeModal={closeUserModal}
        data={userModalData}
        users={users}
      />
      <Title>
        <h3>Discuss #{activeChannel.name.toLowerCase()}</h3>
        <div>
          <Tooltip title="Hide members list" placement="bottom">
            <UsersListIcon onClick={onClickShowUsersSidebar} />
          </Tooltip>
          <Tooltip title="Take a cheeky look" placement="bottom">
            <a href="https://susie.mx">
              <MySite />
            </a>
          </Tooltip>
        </div>
      </Title>
      <Content>
        <ChatArea>
          <Messages
            messages={activeChannel.messages}
            localUser={localUser}
            server={server}
            openUserModal={openUserModal}
            onMessageEdit={onMessageEdit}
            onClickDeleteMessage={onClickDeleteMessage}
          />
          <NewMessageInput
            activeChannel={activeChannel}
            onNewMessage={onNewMessage}
            onTypingIndicatorChanged={onTypingIndicatorChanged}
          />
          <div>
            <span className="typing-indicator">{typingUsersMessage}</span>
          </div>
        </ChatArea>
        {showUsersSidebar && (
          <UsersSidebar
            users={users.filter((user) => isUserInServer(user, server))}
            roles={roles}
            localUser={localUser}
            server={server}
            openUserModal={openUserModal}
            onClickKick={onClickKick}
          />
        )}
      </Content>
    </Container>
  );
};

export default Chat;
