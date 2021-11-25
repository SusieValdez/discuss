import React from "react";
import { formatRelative } from "date-fns";

// Styles
import {
  Container,
  Header,
  Username,
  Timestamp,
  Col,
  Avatar,
  Content,
} from "./Message.styles";

const Message = ({ avatarUrl, username, timestamp, text }) => {
  return (
    <Container>
      <Col>
        <Avatar src={avatarUrl}></Avatar>
      </Col>
      <div>
        <Header>
          <Username>{username}</Username>
          <Timestamp>{formatRelative(timestamp, Date.now())}</Timestamp>
        </Header>
        <Content>{text}</Content>
      </div>
    </Container>
  );
};

export default Message;
