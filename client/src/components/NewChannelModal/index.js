import React from "react";
import Modal from "react-modal";

const NewChannelModal = ({ closeModal, data }) => {
  if (!data) {
    return <></>;
  }
  return (
    <Modal isOpen={true} onRequestClose={closeModal}>
      <div>New Channel in Category: {data.category.name}</div>
    </Modal>
  );
};

export default NewChannelModal;
