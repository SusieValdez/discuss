import React from "react";
// Styles
import {
  Container,
  RolesColumn,
  SidebarSubmenu,
  SidebarContent,
  RoleSubsection,
  RoleColor,
  Content,
  Header,
  SubMenu,
} from "./RoleEdit.styles";
// Assets
import { ReactComponent as ArrowBack } from "../../assets/arrow-left-solid.svg";
import { ReactComponent as Plus } from "../../assets/plus-solid.svg";

const RoleEdit = ({
  onSelectRole,
  onClickBack,
  roles,
  selectedRole,
  users,
}) => {
  const roleCounts = {};
  for (const role of roles) {
    roleCounts[role._id] = 0;
  }
  for (const user of users) {
    for (const roleId of user.roles) {
      roleCounts[roleId]++;
    }
  }

  return (
    <Container>
      <RolesColumn>
        <SidebarSubmenu>
          <div className="submenu-back-button">
            <ArrowBack onClick={onClickBack} />
            <h2>Back</h2>
          </div>
          <Plus />
        </SidebarSubmenu>
        <SidebarContent>
          {roles.map((role) => (
            <RoleSubsection
              key={role._id}
              onClick={onSelectRole(role)}
              isActive={role._id === selectedRole._id}
            >
              <RoleColor backgroundColor={role.color} />
              <p>{role.name}</p>
            </RoleSubsection>
          ))}
        </SidebarContent>
      </RolesColumn>
      <Content>
        <Header>
          <h1>Edit Role — {selectedRole.name}</h1>
        </Header>
        <SubMenu>
          <p>Display</p>
          <p>Permissions</p>
          <p>Manage Members({roleCounts[selectedRole._id]})</p>
        </SubMenu>
        <h5>Role Name</h5>
        <input type="text" value={selectedRole.name} />
        <h5>Role Color</h5>
        <p>
          Members use the color of the highest role they have on the roles list.
        </p>
        <input type="color" value={selectedRole.color} />
      </Content>
    </Container>
  );
};

export default RoleEdit;
