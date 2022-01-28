import React from "react";
import { formatRelative } from "date-fns";

// Styles
import {
  Container,
  Username,
  Timestamp,
  Avatar,
  Content,
} from "./Message.styles";

const Message = ({ user, timestamp, text, role, openUserModal }) => {
  return (
    <Container>
      <Avatar
        onClick={openUserModal(user)}
        backgroundColor={user.bannerColor}
        src={user.avatarUrl}
      ></Avatar>
      <div>
        <div>
          <Username onClick={openUserModal(user)} style={{ color: role.color }}>
            {user.name}
          </Username>
          <Timestamp>{formatRelative(timestamp, Date.now())}</Timestamp>
        </div>
        <Content>{text}</Content>
      </div>
    </Container>
  );
};

export default Message;
