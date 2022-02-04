import React, { useState } from "react";
import Modal from "react-modal";
// Styles
import {
  Container,
  Content,
  Footer,
  BackButton,
  CreateButton,
  Guidelines,
} from "./NewServerModal.styles";
// Assets
import { ReactComponent as CloseIcon } from "../../assets/close-icon.svg";

const NewServerModal = ({ isOpen, closeModal, onNewServer }) => {
  const [newServerName, setNewServerName] = useState("");

  const onChangeNewServerName = (e) => {
    setNewServerName(e.target.value);
  };

  const onKeyPressNewServerName = (e) => {
    if (newServerName.length > 0 && e.key === "Enter") {
      onNewServer(newServerName);
      closeModal();
    }
  };

  const onClickConfirm = () => {
    if (newServerName.length > 0) {
      onNewServer(newServerName);
      closeModal();
      setNewServerName("");
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      style={{
        overlay: {
          backgroundColor: "rgba(6, 5, 8, 0.918)",
        },
        content: {
          padding: 0,
          borderRadius: "8px",
          width: "440px",
          height: "404px",
          border: "none",
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)",
          overflow: "hidden",
        },
      }}
    >
      <Container>
        <div onClick={closeModal}>
          <CloseIcon />
        </div>
        <Content>
          <h2>Customize your server</h2>
          <p>
            Give your new server a personality with a name and an icon. You can
            always change it later.
          </p>
          <h5>Server name</h5>
          <input
            autoFocus
            placeholder="Server Name"
            value={newServerName}
            onChange={onChangeNewServerName}
            onKeyPress={onKeyPressNewServerName}
          />
          <Guidelines>
            By creating a server, you agree to Discuss'{" "}
            <strong>Guidelines</strong>
          </Guidelines>
        </Content>
        <Footer>
          <BackButton onClick={closeModal}>Back</BackButton>
          <CreateButton
            isActive={newServerName.length > 0}
            onClick={onClickConfirm}
          >
            Create
          </CreateButton>
        </Footer>
      </Container>
    </Modal>
  );
};

export default NewServerModal;
