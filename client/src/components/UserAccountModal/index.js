import React from "react";
import Modal from "react-modal";

const UserAccountModal = ({ closeModal, data, onClickLogout }) => {
  if (!data) {
    return <></>;
  }
  return (
    <Modal isOpen={true} onRequestClose={closeModal}>
      <div>User Settings</div>
      <button onClick={onClickLogout}>Logout</button>
    </Modal>
  );
};

export default UserAccountModal;
