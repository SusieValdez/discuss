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

const UsersSidebar = () => {
  return (
    <Container>
      <h2>Server President</h2>
      <User
        username="Prima"
        avatarUrl="https://i.pravatar.cc/300?u=1"
        legend="hey, ho... "
      />
      <User
        username="Louie"
        avatarUrl="https://i.pravatar.cc/300?u=2"
        legend="More Movies... "
      />
      <User
        username="Mirna"
        avatarUrl="https://i.pravatar.cc/300?u=3"
        legend="I like waffles "
      />
      <User
        username="Linda"
        avatarUrl="https://i.pravatar.cc/300?u=4"
        legend="Aliens👽 "
      />
      <h2>Members</h2>
      <User
        username="Tobey"
        avatarUrl="https://i.pravatar.cc/300?u=5"
        legend="Normalize pets"
      />
      <User
        username="Sonya"
        avatarUrl="https://i.pravatar.cc/300?u=6"
        legend="Found my glasses!"
      />
      <User
        username="Tina"
        avatarUrl="https://i.pravatar.cc/300?u=7"
        legend="I'm cold teehee"
      />
      <User
        username="Tim"
        avatarUrl="https://i.pravatar.cc/300?u=8"
        legend="Mom's fave pic"
      />
    </Container>
  );
};

const User = ({ avatarUrl, username, legend }) => {
  return (
    <UserContainer>
      <ProfileImage src={avatarUrl} />
      <UserContent>
        <Username>{username}</Username>
        <Legend>{legend} </Legend>
      </UserContent>
    </UserContainer>
  );
};

export default UsersSidebar;
