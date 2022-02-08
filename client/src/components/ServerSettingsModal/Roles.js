import React, { useCallback, useState } from "react";
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
  RoleRow,
} from "./Roles.styles";
// Assets
import { ReactComponent as ChevronRightIcon } from "../../assets/chevron-right-solid.svg";
import { ReactComponent as UsersIcon } from "../../assets/user-friends-solid.svg";
import { ReactComponent as UserIcon } from "../../assets/single-user-solid.svg";
import { ReactComponent as SearchIcon } from "../../assets/search-solid.svg";

const Roles = ({ users, roles, onClickAddRole, onClickDeleteRole }) => {
  const [selectedRole, setSelectedRole] = useState(undefined);

  const roleCounts = {};
  for (const role of roles) {
    roleCounts[role._id] = 0;
  }
  for (const user of users) {
    for (const roleId of user.roles) {
      roleCounts[roleId]++;
    }
  }

  const onSelectRole = useCallback(
    (role) => () => {
      setSelectedRole(role);
    },
    [setSelectedRole]
  );

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
        onClickAddRole={onClickAddRole}
        onClickDeleteRole={onClickDeleteRole}
      />
    );
  }

  return (
    <Container>
      <Content>
        <h1>Roles</h1>
        <p>
          Use roles to organize your server members and customize their
          permissions
        </p>
        <DefaultPermissions>
          <UsersIcon />
          <div>
            <h3>Default Permissions</h3>
            <p>@everyone | applies to all server members</p>
          </div>
          <ChevronRightIcon />
        </DefaultPermissions>
        <CreateNewRole onClick={onClickAddRole}>
          <input type="text" placeholder="Search Roles" />
          <SearchIcon />
          <ButtonCreateRole>Create Role</ButtonCreateRole>
        </CreateNewRole>
        <p>
          Members use the color of the highest role they have on this list. Drag
          roles to reorder them.
        </p>
        <RolesContainer>
          <h4>Roles</h4>
          <h4>Members</h4>
        </RolesContainer>

        {roles.map((role) => (
          <RoleRow key={role._id} onClick={onSelectRole(role)}>
            <h2>{role.name}</h2>
            <div>
              <span>
                {roleCounts[role._id]} <UserIcon className="svg-icon" />
              </span>
            </div>
          </RoleRow>
        ))}
      </Content>
    </Container>
  );
};

export default Roles;
