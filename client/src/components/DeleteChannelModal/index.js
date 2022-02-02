import React from "react";
import Modal from "react-modal";
// Styles
import {
  Container,
  Header,
  Content,
  Footer,
} from "./DeleteChannelModal.styles";

const DeleteChannelModal = ({ closeModal, data, onClickDeleteChannel }) => {
  if (!data) {
    return <></>;
  }
  const onClickConfirm = () => {
    onClickDeleteChannel(data.channel._id);
    closeModal();
  };

  return (
    <Modal
      isOpen={true}
      onRequestClose={closeModal}
      style={{
        overlay: {
          backgroundColor: "rgba(6, 5, 8, 0.918)",
        },
        content: {
          padding: 0,
          borderRadius: "8px",
          width: "440px",
          border: "none",
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)",
        },
      }}
    >
      <Container>
        <Header>
          <h3>Delete Channel</h3>
        </Header>
        <Content>
          <p>
            Are you sure you want to delete <strong>Channel name</strong>? This
            cannot be undone.
          </p>
        </Content>
        <Footer>
          <button onClick={closeModal} className="cancel-button">
            Cancel
          </button>
          <button onClick={onClickConfirm} className="delete-button">
            Delete Channel
          </button>
        </Footer>
      </Container>
    </Modal>
  );
};

/*return (
    <Modal isOpen={true} onRequestClose={closeModal}>
      <div>Delete channel: {data.channel.name}</div>
    </Modal>
  );
};
*/

export default DeleteChannelModal;
