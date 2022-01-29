import React from "react";
// Styles
import {
  Container,
  UserContainer,
  ProfileImage,
  UserContent,
  Username,
  Legend,
} from "./UsersSidebar.styles";

const UsersSidebar = ({ roles, users, openUserModal }) => {
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
        />
      ))}
      <UserList
        name="Offline"
        users={userCategories.offline}
        openUserModal={openUserModal}
      />
    </Container>
  );
};

const UserList = ({ name, users, openUserModal }) => {
  if (users.length === 0) {
    return <></>;
  }
  return (
    <div>
      <h2>
        {name} — {users.length}
      </h2>
      {users.map((user) => (
        <User key={user._id} {...user} openUserModal={openUserModal(user)} />
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
}) => {
  return (
    <UserContainer
      opacity={onlineStatus === "online" ? "1" : "0.3"}
      onClick={openUserModal}
    >
      <ProfileImage backgroundColor={bannerColor} src={avatarUrl} />
      <UserContent>
        <Username color={roles[0].color}>{name}</Username>
        <Legend>{legend}</Legend>
      </UserContent>
    </UserContainer>
  );
};

export default UsersSidebar;
