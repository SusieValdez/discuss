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

const UsersSidebar = ({ roles, users }) => {
  const userCategories = {
    online: {},
    offline: [],
  };
  for (const role of Object.values(roles)) {
    userCategories.online[role._id] = {
      role,
      users: [],
    };
  }
  for (const user of Object.values(users)) {
    if (user.onlineStatus === "online") {
      userCategories.online[user.roleId].users.push(user);
    } else {
      userCategories.offline.push(user);
    }
  }

  return (
    <Container>
      {Object.values(userCategories.online).map(({ role, users }) => (
        <UserList key={role._id} name={role.name} users={users} roles={roles} />
      ))}
      <UserList name="Offline" users={userCategories.offline} roles={roles} />
    </Container>
  );
};

const UserList = ({ name, users, roles }) => {
  return (
    <div>
      <h2>
        {name} — {users.length}
      </h2>
      {users.map((u) => (
        <User key={u._id} {...u} role={roles[u.roleId]} />
      ))}
    </div>
  );
};

const User = ({ avatarUrl, name, legend, role, onlineStatus }) => {
  return (
    <UserContainer opacity={onlineStatus !== "online" ? "0.3" : "1"}>
      <ProfileImage src={avatarUrl} />
      <UserContent>
        <Username color={role.color}>{name.slice(0, 10)}...</Username>
        <Legend>{legend}</Legend>
      </UserContent>
    </UserContainer>
  );
};

export default UsersSidebar;
