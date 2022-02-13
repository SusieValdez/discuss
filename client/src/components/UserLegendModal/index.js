import React, { useState } from "react";
import Modal from "react-modal";
// Styles
import {
  Container,
  Content,
  Footer,
  CreateButton,
  BackButton,
} from "./UserLegendModal.styles";

Modal.setAppElement("#root");

const UserLegendModal = ({
  isOpen,
  closeModal,
  localUser,
  onEditUserAccount,
}) => {
  const [newUserLegend, setNewUserLegend] = useState(localUser.legend);

  const validChanges =
    newUserLegend.length > 0 && newUserLegend !== localUser.legend;

  const onChangeUserLegend = (e) => {
    setNewUserLegend(e.target.value);
  };

  const onKeyPressNewUserLegend = (e) => {
    if (validChanges && e.key === "Enter") {
      onEditUserAccount({ legend: newUserLegend });
      closeModal();
    }
  };

  const onClickConfirm = () => {
    if (validChanges) {
      onEditUserAccount({ legend: newUserLegend });
      closeModal();
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
          backgroundColor: "#36393f",
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
          overflow: "hidden",
        },
      }}
    >
      <Container>
        <Content>
          <h1>Set a custom legend</h1>
          <h5>What's cookin', {localUser.name}?</h5>
          <input
            type="text"
            placeholder="Support has arrived!"
            value={newUserLegend}
            onChange={onChangeUserLegend}
            onKeyPress={onKeyPressNewUserLegend}
          />
        </Content>
        <Footer>
          <BackButton onClick={closeModal}>Back</BackButton>
          <CreateButton isActive={validChanges} onClick={onClickConfirm}>
            Save
          </CreateButton>
        </Footer>
      </Container>
    </Modal>
  );
};

export default UserLegendModal;
