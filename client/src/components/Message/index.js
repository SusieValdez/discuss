import React, { useEffect, useRef, useState } from "react";
import { formatRelative } from "date-fns";

// Styles
import {
  Container,
  Username,
  Timestamp,
  Avatar,
  Content,
} from "./Message.styles";
import { Menu } from "../../ui/Menus";

import { MenuItem, useMenuState } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";

const urlRegex =
  /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#/%?=~_|!:,.;]*[-A-Z0-9+&@#/%=~_|])/gi;

function isLink(word) {
  return word.match(urlRegex) !== null;
}

const Message = ({
  userId,
  user,
  timestamp,
  text,
  openUserModal,
  onMessageEdit,
  onClickDeleteMessage,
}) => {
  const messageMenu = useMenuState();
  const userMenu = useMenuState();
  const [anchorPoint, setAnchorPoint] = useState({ x: 0, y: 0 });

  const [isEditing, setIsEditing] = useState(false);
  const [editedMessage, setEditedMessage] = useState(text);

  const [images, setImages] = useState([]);

  useEffect(() => {
    setImages([]);
    const links = text.split(" ").filter(isLink);
    links.forEach(async (link) => {
      try {
        const response = await fetch(link);
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.split("/")[0] === "image") {
          setImages((images) => [...images, link]);
        }
      } catch {}
    });
  }, [text]);

  useEffect(() => {
    setEditedMessage(text);
  }, [text]);

  const editInputRef = useRef(null);

  useEffect(() => {
    editInputRef.current?.focus();
  });

  const onRightClickMessage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setAnchorPoint({ x: e.clientX, y: e.clientY });
    messageMenu.toggleMenu(true);
  };

  const onRightClickUser = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setAnchorPoint({ x: e.clientX, y: e.clientY });
    userMenu.toggleMenu(true);
  };

  const onClickEditMessage = () => {
    setIsEditing(true);
  };

  const onChangeEditedMessage = (e) => {
    setEditedMessage(e.target.value);
  };

  const onKeyDownEditedMessage = (e) => {
    if (editedMessage.length > 0 && e.key === "Enter") {
      onMessageEdit(editedMessage);
      setIsEditing(false);
    }
  };

  if (!user) {
    user = {
      name: `Unknown: ${userId}`,
      avatarUrl: `https://thumbs.dreamstime.com/b/ask-icon-vector-question-mark-male-user-person-profile-avatar-symbol-help-sign-glyph-pictogram-illustration-ask-icon-168789141.jpg`,
      bannerColor: "#111",
      roles: [{ color: "#111" }],
    };
  }

  const content = text.split(" ").map((word, i) => {
    if (isLink(word)) {
      if (images.includes(word)) {
        return "";
      }
      return (
        <a key={i} href={word}>
          {word}
        </a>
      );
    }
    return ` ${word} `;
  });

  return (
    <Container onContextMenu={onRightClickMessage}>
      <Avatar
        onClick={openUserModal(user)}
        onContextMenu={onRightClickUser}
        backgroundColor={user.bannerColor}
        src={user.avatarUrl}
      />
      <div>
        <div>
          <Username
            onClick={openUserModal(user)}
            onContextMenu={onRightClickUser}
            style={{ color: user.roles[0].color }}
          >
            {user.name}
          </Username>
          <Timestamp>{formatRelative(timestamp, Date.now())}</Timestamp>
        </div>
        {isEditing ? (
          <input
            ref={editInputRef}
            value={editedMessage}
            onChange={onChangeEditedMessage}
            onKeyDown={onKeyDownEditedMessage}
          />
        ) : (
          <Content>
            {content}
            <div>
              {images.map((src, i) => (
                <img key={i} src={src} alt={src} />
              ))}
            </div>
          </Content>
        )}
      </div>
      <Menu
        state={messageMenu.state}
        endTransition={messageMenu.endTransition}
        anchorPoint={anchorPoint}
        onClose={() => messageMenu.toggleMenu(false)}
      >
        <MenuItem onClick={onClickEditMessage}>Edit Message</MenuItem>
        <MenuItem onClick={onClickDeleteMessage}>Delete Message</MenuItem>
      </Menu>
      <Menu
        state={userMenu.state}
        endTransition={userMenu.endTransition}
        anchorPoint={anchorPoint}
        onClose={() => userMenu.toggleMenu(false)}
      >
        <MenuItem>Kick User</MenuItem>
      </Menu>
    </Container>
  );
};

export default Message;
