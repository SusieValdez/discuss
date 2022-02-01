import React from "react";
import Modal from "react-modal";

const ServerSettingsModal = ({ closeModal, data }) => {
  if (!data) {
    return <></>;
  }
  return (
    <Modal isOpen={true} onRequestClose={closeModal}>
      <div>Server Settings</div>
    </Modal>
  );
};

export default ServerSettingsModal;
