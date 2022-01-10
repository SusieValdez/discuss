import React, { useRef } from "react";
import { useEffect } from "react";
// Components
import Message from "../Message";
// Styles
import { Container } from "./Messages.styles.js";

const Messages = ({ messages, users, roles }) => {
  const messagesRef = useRef(null);
  useEffect(() => {
    const messages = messagesRef.current;
    messages?.scroll({
      top: messages.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);
  return (
    <Container ref={messagesRef}>
      {messages.map((message, i) => {
        const user = users[message.userId] || {
          id: message.userId,
          name: `Unknown: ${message.userId}`,
          avatarUrl: `https://thumbs.dreamstime.com/b/ask-icon-vector-question-mark-male-user-person-profile-avatar-symbol-help-sign-glyph-pictogram-illustration-ask-icon-168789141.jpg`,
        };
        const role = roles[user.roleId] || {
          name: "Member",
        };
        return <Message key={i} {...message} user={user} role={role} />;
      })}
    </Container>
  );
};

export default Messages;
