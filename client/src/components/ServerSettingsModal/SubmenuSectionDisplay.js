import React, { useState } from "react";
// Styles
import { ConfirmButton, DeleteButton } from "./Display.styles";

const SubmenuSectionDisplay = ({
  selectedRole,
  onClickDeleteRole,
  onEditRole,
}) => {
  const [newName, setNewName] = useState(selectedRole.name);
  const [newColor, setNewColor] = useState(selectedRole.color);

  const onClickDeleteRoleButton = () => {
    if (selectedRole.name === "everyone") {
      return;
    }
    onClickDeleteRole(selectedRole._id);
  };

  const onChangeRoleName = (e) => {
    setNewName(e.target.value);
  };
  const onChangeRoleColor = (e) => {
    setNewColor(e.target.value);
  };

  const verifyChanges =
    (selectedRole.name !== "everyone" &&
      newName !== selectedRole.name &&
      newName !== "") ||
    (newColor !== selectedRole.color && newColor !== "");

  const onClickConfirm = () => {
    if (!verifyChanges) {
      return;
    }
    onEditRole(selectedRole._id, {
      name: newName,
      color: newColor,
    });
  };

  return (
    <div>
      <h5>Role Name</h5>
      <input type="text" value={newName} onChange={onChangeRoleName} />
      <h5>Role Color</h5>
      <p>
        Members use the color of the highest role they have on the roles list.
      </p>
      <input type="color" value={newColor} onChange={onChangeRoleColor} />
      <DeleteButton
        onClick={onClickDeleteRoleButton}
        className={selectedRole.name === "everyone" ? "disabled" : "active"}
      >
        Delete Role
      </DeleteButton>
      <ConfirmButton
        onClick={onClickConfirm}
        className={!verifyChanges ? "disabled" : "active"}
      >
        Confirm Changes
      </ConfirmButton>
    </div>
  );
};

export default SubmenuSectionDisplay;
