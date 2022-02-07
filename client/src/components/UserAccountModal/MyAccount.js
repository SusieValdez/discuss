import React, { useState } from "react";
// Styles
import { Content, Footer } from "./MyAccount.styles";

const MyAccount = ({ user, onEditUserAccount }) => {
  const [newUserName, setNewUserName] = useState(user.name);
  const [newEmail, setNewEmail] = useState(user.email);
  const [newPassword, setNewPassword] = useState("");

  const onCancel = () => {
    setNewUserName(user.name);
    setNewEmail(user.email);
    setNewPassword(user.password);
  };

  const validStateChange =
    (newUserName !== user.name && newUserName.length > 0) ||
    (newEmail !== user.email && newEmail.length > 4) ||
    (newPassword !== user.password && newPassword.length > 4);

  const onClickConfirm = () => {
    if (validStateChange) {
      onEditUserAccount({
        name: newUserName,
        email: newEmail,
        password: newPassword,
      });
    }
  };

  return (
    <Content>
      <h2>My Account</h2>
      <h5>Username</h5>
      <input
        type="text"
        autoFocus
        value={newUserName}
        placeholder={user.name}
        onChange={(e) => setNewUserName(e.target.value)}
      />
      <h5>Email</h5>
      <input
        type="text"
        autoFocus
        value={newEmail}
        placeholder="me@example.com"
        onChange={(e) => setNewEmail(e.target.value)}
      />
      <h5>Password</h5>
      <input
        type="password"
        autoFocus
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <Footer>
        <button onClick={onCancel} className="cancel-button">
          Cancel
        </button>
        <button
          className={`create-button ${
            validStateChange ? "active" : "disabled"
          }`}
          onClick={onClickConfirm}
        >
          Confirm Changes
        </button>
      </Footer>
    </Content>
  );
};

export default MyAccount;
