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

const Message = ({ avatarUrl, username, timestamp, text, roleColor }) => {
  return (
    <Container>
      <Avatar src={avatarUrl}></Avatar>
      <div>
        <div>
          <Username style={{ color: roleColor }}>{username}</Username>
          <Timestamp>{formatRelative(timestamp, Date.now())}</Timestamp>
        </div>
        <Content>{text}</Content>
      </div>
    </Container>
  );
};

export default Message;
