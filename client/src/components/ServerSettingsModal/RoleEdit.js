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
  onAddNewRoleToUser,
  onRemoveRoleFromUser,
}) => {
  const [submenuSection, setSubmenuSection] = useState("Display");
  useEffect(() => {
    if (selectedRole.name === "everyone") {
      setSubmenuSection("Permissions");
    }
  }, [selectedRole.name]);

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
          roles={roles}
          onAddNewRoleToUser={onAddNewRoleToUser}
          onRemoveRoleFromUser={onRemoveRoleFromUser}
        />
      );
      break;
    default:
      break;
  }

  const onClickSubmenuItem = (newSection) => {
    if (selectedRole.name === "everyone") {
      return;
    }
    setSubmenuSection(newSection);
  };

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
          <p
            style={{
              cursor: selectedRole.name === "everyone" && "not-allowed",
            }}
            onClick={() => onClickSubmenuItem("Display")}
          >
            Display
          </p>
          <p onClick={() => onClickSubmenuItem("Permissions")}>Permissions</p>
          <p
            style={{
              cursor: selectedRole.name === "everyone" && "not-allowed",
            }}
            onClick={() => onClickSubmenuItem("Manage Members")}
          >
            Manage Members({roleCounts[selectedRole._id]})
          </p>
        </SubMenu>
        {content}
      </EditContainer>
    </Container>
  );
};

export default RoleEdit;
