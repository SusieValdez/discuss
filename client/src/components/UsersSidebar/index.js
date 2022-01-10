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
        <div key={role.id}>
          <h2>{role.name}</h2>
          {Object.values(users)
            .filter((u) => u.roleId === role.id)
            .map((u) => (
              <User key={u.id} {...u} role={roles[u.roleId]} />
            ))}
        </div>
      ))}
    </Container>
  );
};

const User = ({ avatarUrl, name, legend, role }) => {
  return (
    <UserContainer>
      <ProfileImage src={avatarUrl} />
      <UserContent>
        <Username color={role.color}>{name.slice(0, 10)}...</Username>
        <Legend>{legend} </Legend>
      </UserContent>
    </UserContainer>
  );
};

export default UsersSidebar;
