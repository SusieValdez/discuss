import React from "react";
// Styles
import { DeleteButton } from "./Display.styles";

const SubmenuSectionDisplay = ({ selectedRole, onClickDeleteRole }) => {
  const onClickDeleteRoleButton = () => {
    if (selectedRole.name === "everyone") {
      return;
    }
    onClickDeleteRole(selectedRole._id);
  };

  const onChangeRoleName = () => {};
  const onChangeRoleColor = () => {};

  return (
    <div>
      <h5>Role Name</h5>
      <input
        type="text"
        value={selectedRole.name}
        onChange={onChangeRoleName}
      />
      <h5>Role Color</h5>
      <p>
        Members use the color of the highest role they have on the roles list.
      </p>
      <input
        type="color"
        value={selectedRole.color}
        onChange={onChangeRoleColor}
      />
      <DeleteButton
        onClick={onClickDeleteRoleButton}
        className={selectedRole.name === "everyone" ? "disabled" : "active"}
      >
        Delete Role
      </DeleteButton>
    </div>
  );
};

export default SubmenuSectionDisplay;
