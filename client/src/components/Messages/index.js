import React, { useRef } from "react";
import { useEffect } from "react";
// Components
import Message from "../Message";
// Styles
import { Container, Content } from "./Messages.styles.js";

const Messages = ({ messages }) => {
  const messagesRef = useRef(null);
  useEffect(() => {
    const messages = messagesRef.current;
    messages?.scroll({
      top: messages.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);
  return (
    <Container>
      <Content ref={messagesRef}>
        {messages.map((message, i) => (
          <Message
            key={i}
            avatarUrl={message.avatarUrl}
            username={message.username}
            timestamp={message.timestamp}
            text={message.text}
          />
        ))}
      </Content>
    </Container>
  );
};

export default Messages;
