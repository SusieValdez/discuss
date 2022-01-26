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
  return (
    <Container>
      {Object.values(roles).map((role) => (
        <div key={role._id}>
          <h2>{role.name}</h2>
          {Object.values(users)
            .filter((u) => u.roleId === role._id)
            .map((u) => (
              <User key={u._id} {...u} role={roles[u.roleId]} />
            ))}
        </div>
      ))}
    </Container>
  );
};

const User = ({ avatarUrl, name, legend, role, onlineStatus }) => {
  return (
    <UserContainer>
      <ProfileImage src={avatarUrl} />
      <UserContent>
        <Username color={onlineStatus !== "online" ? "#111" : role.color}>
          {name.slice(0, 10)}...
        </Username>
        <Legend>{legend}</Legend>
      </UserContent>
    </UserContainer>
  );
};

export default UsersSidebar;
