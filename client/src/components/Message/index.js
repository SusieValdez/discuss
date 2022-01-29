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

const Message = ({ userId, user, timestamp, text, openUserModal }) => {
  if (!user) {
    user = {
      name: `Unknown: ${userId}`,
      avatarUrl: `https://thumbs.dreamstime.com/b/ask-icon-vector-question-mark-male-user-person-profile-avatar-symbol-help-sign-glyph-pictogram-illustration-ask-icon-168789141.jpg`,
      bannerColor: "#111",
      roles: [{ color: "#111" }],
    };
  }
  return (
    <Container>
      <Avatar
        onClick={openUserModal(user)}
        backgroundColor={user.bannerColor}
        src={user.avatarUrl}
      ></Avatar>
      <div>
        <div>
          <Username
            onClick={openUserModal(user)}
            style={{ color: user.roles[0].color }}
          >
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
