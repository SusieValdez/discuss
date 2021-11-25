import React from "react";
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
          <Timestamp>{timestamp}</Timestamp>
        </Header>
        <Content>{text}</Content>
      </div>
    </Container>
  );
};

export default Message;
