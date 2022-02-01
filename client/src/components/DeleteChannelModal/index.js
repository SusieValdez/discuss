import React from "react";
import Modal from "react-modal";

const DeleteChannelModal = ({ closeModal, data, onClickDeleteChannel }) => {
  if (!data) {
    return <></>;
  }

  const onClickConfirm = () => {
    onClickDeleteChannel(data.channel._id);
    closeModal();
  };

  return (
    <Modal isOpen={true} onRequestClose={closeModal}>
      <div>Delete channel: {data.channel.name}</div>
      <button onClick={onClickConfirm}>Confirm</button>
    </Modal>
  );
};

export default DeleteChannelModal;
