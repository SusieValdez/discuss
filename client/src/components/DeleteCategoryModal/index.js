import React from "react";
import Modal from "react-modal";

const DeleteCategoryModal = ({ closeModal, data }) => {
  if (!data) {
    return <></>;
  }
  return (
    <Modal isOpen={true} onRequestClose={closeModal}>
      <div>Delete Category: {data.category.name}</div>
    </Modal>
  );
};

export default DeleteCategoryModal;
