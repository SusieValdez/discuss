import React, { useRef } from "react";
import { useEffect } from "react";
import { Divider } from "../Chat/Chat.styles";
// Components
import Message from "../Message";
// Styles
import { Container } from "./Messages.styles.js";

const months = [
  "January",
  "Feburary",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "Setember",
  "October",
  "November",
  "December",
];

const getDayString = (timestamp) => {
  const d = new Date(timestamp);
  const date = d.getDate();
  const month = months[d.getMonth()];
  const year = d.getFullYear();
  return `${month} ${date}, ${year}`;
};

const groupMessagesByDay = (messages) => {
  const dailyMessages = {};
  for (const message of messages) {
    const dayString = getDayString(message.timestamp);
    if (dailyMessages[dayString] === undefined) {
      dailyMessages[dayString] = [];
    }
    dailyMessages[dayString].push(message);
  }
  return dailyMessages;
};

const Messages = ({
  messages,
  localUser,
  server,
  openUserModal,
  onMessageEdit,
  onClickDeleteMessage,
}) => {
  const messagesRef = useRef(null);
  useEffect(() => {
    // Wait until images have loaded in each Message
    // This is a bit of a hack
    // TODO: cleaner solution
    setTimeout(() => {
      const messages = messagesRef.current;
      messages?.scroll({
        top: messages.scrollHeight,
        behavior: "smooth",
      });
    }, 300);
  }, [messages]);

  const dailyMessages = groupMessagesByDay(messages);

  return (
    <Container ref={messagesRef}>
      {Object.entries(dailyMessages).map(([dayString, messages], i) => [
        <Divider key={dayString}>
          <span>{dayString}</span>
        </Divider>,
        messages.map((message) => (
          <Message
            key={message._id}
            {...message}
            localUser={localUser}
            server={server}
            openUserModal={openUserModal}
            onMessageEdit={onMessageEdit(message._id)}
            onClickDeleteMessage={onClickDeleteMessage(message._id)}
          />
        )),
      ])}
    </Container>
  );
};

export default Messages;
