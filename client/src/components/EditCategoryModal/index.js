import React from "react";
import Modal from "react-modal";

const EditCategoryModal = ({ closeModal, data }) => {
  if (!data) {
    return <></>;
  }
  return (
    <Modal isOpen={true} onRequestClose={closeModal}>
      <div>Edit Category: {data.category.name}</div>
    </Modal>
  );
};

export default EditCategoryModal;
