import React, { useState } from "react";
// Components
import RoleEdit from "./RoleEdit";
// Styles
import {
  Container,
  Content,
  DefaultPermissions,
  CreateNewRole,
  ButtonCreateRole,
  RolesContainer,
  RolesTitles,
  RoleRow,
} from "./Roles.styles";
// Assets
import { ReactComponent as ChevronRightIcon } from "../../assets/chevron-right-solid.svg";
import { ReactComponent as UsersIcon } from "../../assets/user-friends-solid.svg";
import { ReactComponent as UserIcon } from "../../assets/single-user-solid.svg";
import { ReactComponent as SearchIcon } from "../../assets/search-solid.svg";
import { getEveryoneRole, sortByQuery } from "../../utils";

const Roles = ({
  users,
  roles,
  onClickAddRole,
  onClickDeleteRole,
  onAddNewRoleToUser,
  onRemoveRoleFromUser,
}) => {
  const [selectedRole, setSelectedRole] = useState(undefined);
  if (selectedRole && !roles.find(({ _id }) => _id === selectedRole._id)) {
    setSelectedRole(roles[0]);
  }

  const [searchQuery, setSearchQuery] = useState("");

  const roleCounts = {};
  for (const role of roles) {
    roleCounts[role._id] = 0;
  }
  for (const user of users) {
    if (!user.roles) {
      continue;
    }
    for (const role of user.roles) {
      roleCounts[role._id]++;
    }
  }

  const onSelectRole = (role) => () => setSelectedRole(role);

  const onDeselectRole = () => {
    setSelectedRole(undefined);
  };

  if (selectedRole) {
    return (
      <RoleEdit
        onSelectRole={onSelectRole}
        onClickBack={onDeselectRole}
        roles={roles}
        selectedRole={selectedRole}
        users={users}
        roleCounts={roleCounts}
        onClickAddRole={onClickAddRole}
        onClickDeleteRole={onClickDeleteRole}
        onAddNewRoleToUser={onAddNewRoleToUser}
        onRemoveRoleFromUser={onRemoveRoleFromUser}
      />
    );
  }

  const searchedRoles = sortByQuery(roles, "name", searchQuery);

  return (
    <Container>
      <Content>
        <h1>Roles</h1>
        <p>
          Use roles to organize your server members and customize their
          permissions
        </p>
        <DefaultPermissions onClick={onSelectRole(getEveryoneRole(roles))}>
          <UsersIcon />
          <div>
            <h3>Default Permissions</h3>
            <p>@everyone | applies to all server members</p>
          </div>
          <ChevronRightIcon />
        </DefaultPermissions>
        <CreateNewRole>
          <input
            type="text"
            placeholder="Search Roles"
            autoFocus
            onChange={(e) => setSearchQuery(e.target.value)}
            value={searchQuery}
          />
          <SearchIcon />
          <ButtonCreateRole onClick={onClickAddRole}>
            Create Role
          </ButtonCreateRole>
        </CreateNewRole>
        <p>
          Members use the color of the highest role they have on this list. Drag
          roles to reorder them.
        </p>
        <RolesTitles>
          <h4>Roles</h4>
          <h4>Members</h4>
        </RolesTitles>
        <RolesContainer>
          {searchedRoles.map((role) => (
            <RoleRow key={role._id} onClick={onSelectRole(role)}>
              <h2>{role.name}</h2>
              <div>
                <span>
                  {roleCounts[role._id]} <UserIcon className="svg-icon" />
                </span>
              </div>
            </RoleRow>
          ))}
        </RolesContainer>
      </Content>
    </Container>
  );
};

export default Roles;
