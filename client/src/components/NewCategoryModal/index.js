import React from "react";
import Modal from "react-modal";

const NewCategoryModal = ({ closeModal, data }) => {
  if (!data) {
    return <></>;
  }
  return (
    <Modal isOpen={true} onRequestClose={closeModal}>
      <div>New Category</div>
    </Modal>
  );
};

export default NewCategoryModal;
