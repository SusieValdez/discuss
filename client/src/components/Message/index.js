import React, { useEffect, useState } from "react";
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

const allEmojis =
  /^(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|[\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|[\ud83c[\ude32-\ude3a]|[\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])+$/;

function isLink(word) {
  return word.match(urlRegex) !== null;
}

function isAllEmojis(text) {
  return text.match(allEmojis) !== null;
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
    if (e.key === "Escape") {
      setIsEditing(false);
    }
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
        backgroundColor={user.avatarUrl ? "none" : user.bannerColor}
        src={user.avatarUrl || "/default-user-logo.svg"}
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
            autoFocus
            value={editedMessage}
            onChange={onChangeEditedMessage}
            onKeyDown={onKeyDownEditedMessage}
          />
        ) : (
          <Content
            style={{
              fontSize: isAllEmojis(text) ? "48px" : "16px",
            }}
          >
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
