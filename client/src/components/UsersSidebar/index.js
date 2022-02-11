import { MenuItem, useMenuState } from "@szhsin/react-menu";
import React, { useState } from "react";
import { Menu } from "../../ui/Menus";
import { topRoleColor } from "../../utils";
// Styles
import {
  Container,
  UserContainer,
  ProfileImage,
  UserContent,
  Username,
  Legend,
} from "./UsersSidebar.styles";

const UsersSidebar = ({ roles, users, openUserModal, onClickKick }) => {
  const userCategories = {
    online: new Map(),
    offline: [],
  };
  for (let role of roles) {
    // Handle @everyone as a special case name
    role = { ...role, name: role.name === "everyone" ? "online" : role.name };
    userCategories.online.set(role._id, {
      role,
      users: [],
    });
  }
  for (const user of users) {
    if (user.onlineStatus === "online") {
      userCategories.online.get(user.roles[0]._id).users.push(user);
    } else {
      userCategories.offline.push(user);
    }
  }

  return (
    <Container>
      {[...userCategories.online.values()].map(({ role, users }) => (
        <UserList
          key={role._id}
          name={role.name}
          users={users}
          openUserModal={openUserModal}
          onClickKick={onClickKick}
        />
      ))}
      <UserList
        name="Offline"
        users={userCategories.offline}
        openUserModal={openUserModal}
        onClickKick={onClickKick}
      />
    </Container>
  );
};

const UserList = ({ name, users, openUserModal, onClickKick }) => {
  if (users.length === 0) {
    return <></>;
  }
  return (
    <div>
      <h2>
        {name} — {users.length}
      </h2>
      {users
        .sort((u1, u2) => {
          const name1 = u1.name.toUpperCase();
          const name2 = u2.name.toUpperCase();
          return name1 < name2 ? -1 : name1 > name2 ? 1 : 0;
        })
        .map((user) => (
          <User
            key={user._id}
            {...user}
            openUserModal={openUserModal(user)}
            onClickKick={onClickKick(user._id)}
          />
        ))}
    </div>
  );
};

const User = ({
  avatarUrl,
  name,
  legend,
  roles,
  onlineStatus,
  bannerColor,
  openUserModal,
  onClickKick,
}) => {
  const userMenu = useMenuState();
  const [anchorPoint, setAnchorPoint] = useState({ x: 0, y: 0 });

  const onRightClickUser = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setAnchorPoint({ x: e.clientX, y: e.clientY });
    userMenu.toggleMenu(true);
  };

  const opacity = onlineStatus === "online" ? "1" : "0.3";

  const onClickKickButton = (e) => {
    e.syntheticEvent.stopPropagation();
    onClickKick();
  };

  return (
    <UserContainer onClick={openUserModal} onContextMenu={onRightClickUser}>
      <ProfileImage
        backgroundColor={avatarUrl ? "none" : bannerColor}
        src={avatarUrl || "/default-user-logo.svg"}
        style={{ opacity }}
      />
      <UserContent style={{ opacity }}>
        <Username color={topRoleColor({ roles })}>{name}</Username>
        <Legend>{legend}</Legend>
      </UserContent>
      <Menu
        state={userMenu.state}
        endTransition={userMenu.endTransition}
        anchorPoint={anchorPoint}
        onClose={() => userMenu.toggleMenu(false)}
      >
        <MenuItem onClick={onClickKickButton}>Kick User</MenuItem>
      </Menu>
    </UserContainer>
  );
};

export default UsersSidebar;
