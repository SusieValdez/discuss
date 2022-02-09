import React, { useEffect, useState } from "react";
// Components
import SubmenuSectionDisplay from "./SubmenuSectionDisplay";
import SubmenuSectionPermissions from "./SubmenuSectionPermissions";
import SubmenuSectionManageMembers from "./SubmenuSectionManageMembers";
// Styles
import {
  Container,
  RolesColumn,
  SidebarSubmenu,
  SidebarContent,
  RoleSubsection,
  RoleColor,
  EditContainer,
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
  roleCounts,
  onClickAddRole,
  onClickDeleteRole,
}) => {
  const [submenuSection, setSubmenuSection] = useState("Display");

  useEffect(() => {
    onSelectRole(roles[0])();
  }, [roles, onSelectRole]);

  let content;
  switch (submenuSection) {
    case "Display":
      content = (
        <SubmenuSectionDisplay
          selectedRole={selectedRole}
          onClickDeleteRole={onClickDeleteRole}
        />
      );
      break;
    case "Permissions":
      content = <SubmenuSectionPermissions />;
      break;
    case "Manage Members":
      content = (
        <SubmenuSectionManageMembers
          users={users}
          selectedRole={selectedRole}
        />
      );
      break;
    default:
      break;
  }

  return (
    <Container>
      <RolesColumn>
        <SidebarSubmenu>
          <div className="submenu-back-button">
            <ArrowBack
              onClick={onClickBack}
              style={{ width: "20px", height: "20px" }}
            />
            <h2>Back</h2>
          </div>
          <Plus
            onClick={onClickAddRole}
            style={{ width: "20px", height: "20px" }}
          />
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
      <EditContainer>
        <Header>
          <h1>Edit Role — {selectedRole.name}</h1>
        </Header>
        <SubMenu>
          <p onClick={() => setSubmenuSection("Display")}>Display</p>
          <p onClick={() => setSubmenuSection("Permissions")}>Permissions</p>
          <p onClick={() => setSubmenuSection("Manage Members")}>
            Manage Members({roleCounts[selectedRole._id]})
          </p>
        </SubMenu>
        {content}
      </EditContainer>
    </Container>
  );
};

export default RoleEdit;
