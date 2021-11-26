import React from "react";
// import { AccessAlarm, ThreeDRotation } from "@mui/icons-material";
// Components
import Messages from "../Messages";
import NewMessageInput from "../NewMessageInput";
// Styles
import { Container, Title, Children } from "./Chat.styles";

const Chat = ({ messages, onNewMessage }) => {
  return (
    <Container>
      <Title>
        <Children>
          <h3>Discuss #General</h3>
        </Children>
      </Title>
      <Messages messages={messages} />
      <NewMessageInput onNewMessage={onNewMessage} />
    </Container>
  );
};

export default Chat;
