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

const Message = ({ user, timestamp, text, role }) => {
  return (
    <Container>
      <Avatar src={user.avatarUrl}></Avatar>
      <div>
        <div>
          <Username style={{ color: role.color }}>{user.name}</Username>
          <Timestamp>{formatRelative(timestamp, Date.now())}</Timestamp>
        </div>
        <Content>{text}</Content>
      </div>
    </Container>
  );
};

export default Message;
