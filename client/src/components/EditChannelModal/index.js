import React from "react";
import Modal from "react-modal";

const EditChannelModal = ({ closeModal, data }) => {
  if (!data) {
    return <></>;
  }
  return (
    <Modal isOpen={true} onRequestClose={closeModal}>
      <div>Edit Channel: {data.channel.name}</div>
    </Modal>
  );
};

export default EditChannelModal;
