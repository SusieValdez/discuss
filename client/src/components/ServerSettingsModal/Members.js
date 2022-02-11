import React, { useState } from "react";
import { Menu, MenuItem, MenuButton } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";

// Styled
import {
  Content,
  MembersSearchTools,
  UserListContainer,
  MemberDetails,
  MemberRoles,
  MemberRow,
  RoleDiv,
  RoleDot,
} from "./Members.styles";
import { getEveryoneRole, topRoleColor, userHasRole } from "../../utils";

const Members = ({ users, roles }) => {
  const [selectedRole, setSelectedRole] = useState(getEveryoneRole(roles));

  const numUsers = users.length;

  const onSelectRole = (role) => () => {
    setSelectedRole(role);
  };

  const filteredUsers = users.filter((user) => userHasRole(user, selectedRole));

  const rolesWithoutEveryone = roles.filter(({ name }) => name !== "everyone");

  return (
    <Content>
      <h1>Server Members </h1>
      <MembersSearchTools>
        <div>
          <p>
            {numUsers} {numUsers > 1 ? "Members" : "Member"}
          </p>
        </div>
        <div>
          <p>Display role:</p>
          <Menu
            menuButton={<MenuButton>{selectedRole.name}</MenuButton>}
            onMenuChange={(e) => e.open}
          >
            {roles.map((role) => (
              <MenuItem key={role._id} onClick={onSelectRole(role)}>
                <h2>{role.name}</h2>
              </MenuItem>
            ))}
          </Menu>
        </div>
      </MembersSearchTools>
      <UserListContainer>
        <div className="line-break" />
        {filteredUsers.map((user) => (
          <div key={user._id}>
            <MemberRow>
              <MemberDetails>
                <img src={user.avatarUrl} alt="user avatar" />
                <div>
                  <h2 styles={{ color: topRoleColor(user) }}>{user.name}</h2>
                  <span>{user.legend}</span>
                </div>
              </MemberDetails>
              <MemberRoles>
                {rolesWithoutEveryone.map((role) => (
                  <RoleDiv key={role._id}>
                    <RoleDot color={role.color} />
                    {role.name}
                  </RoleDiv>
                ))}
              </MemberRoles>
            </MemberRow>
            <div className="line-break" />
          </div>
        ))}
      </UserListContainer>
    </Content>
  );
};

export default Members;
