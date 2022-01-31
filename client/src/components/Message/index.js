import React, { useState } from "react";
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

const Message = ({ userId, user, timestamp, text, openUserModal }) => {
  const messageMenu = useMenuState();
  const userMenu = useMenuState();
  const [anchorPoint, setAnchorPoint] = useState({ x: 0, y: 0 });

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

  if (!user) {
    user = {
      name: `Unknown: ${userId}`,
      avatarUrl: `https://thumbs.dreamstime.com/b/ask-icon-vector-question-mark-male-user-person-profile-avatar-symbol-help-sign-glyph-pictogram-illustration-ask-icon-168789141.jpg`,
      bannerColor: "#111",
      roles: [{ color: "#111" }],
    };
  }
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
        <Content>{text}</Content>
      </div>
      <Menu
        state={messageMenu.state}
        endTransition={messageMenu.endTransition}
        anchorPoint={anchorPoint}
        onClose={() => messageMenu.toggleMenu(false)}
      >
        <MenuItem>Edit Message</MenuItem>
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
