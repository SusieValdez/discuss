import React, { useState } from "react";
import Modal from "react-modal";
// Styles
import {
  Container,
  OptionSidebar,
  OptionSidebarContainer,
  OptionSidebarHeader,
  Divider,
  DeleteButton,
  IconContainer,
  Content,
  Footer,
} from "./EditChannelModal.styles";
// Assets
import { ReactComponent as CloseIcon } from "../../assets/close-icon.svg";

const EditChannelModal = ({ closeModal, data, onEditChannel }) => {
  const [editedChannelName, setEditedChannelName] = useState("");

  const onChangeEditChannelName = (e) => {
    setEditedChannelName(e.target.value);
  };

  const onClickConfirm = (e) => {
    if (editedChannelName.length > 0) {
      onEditChannel(data.channel._id, { name: editedChannelName });
      closeModal();
    }
  };

  if (!data) {
    return <></>;
  }
  return (
    <Modal
      isOpen={true}
      onRequestClose={closeModal}
      style={{
        overlay: {
          backgroundColor: "rgba(6, 5, 8, 0.918)",
        },
        content: {
          backgrounColor: "var(--bg-chat-area)",
          padding: 0,
          borderRadius: "8px",
          width: "100%",
          height: "100vh",
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
        <OptionSidebar>
          <OptionSidebarContainer>
            <OptionSidebarHeader>
              <h3>Text Channels</h3>
            </OptionSidebarHeader>
            <div>
              <p>Overview</p>
              <p>Permissions</p>
            </div>
            <Divider />
            <DeleteButton>
              <p>Delete Channel</p>
            </DeleteButton>
          </OptionSidebarContainer>
        </OptionSidebar>
        <Content>
          <h2>Overview</h2>
          <h5>Channel Name</h5>
          <input
            autoFocus
            placeholder="Channel Name"
            value={editedChannelName}
            onChange={onChangeEditChannelName}
          />
          <Footer>
            <button onClick={closeModal} className="cancel-button">
              Cancel
            </button>
            <button
              className={`create-button ${
                editedChannelName.length > 0 ? "active" : "disabled"
              }`}
              onClick={onClickConfirm}
            >
              Confirm Changes
            </button>
          </Footer>
        </Content>
        <IconContainer>
          <CloseIcon onClick={closeModal} />
        </IconContainer>
      </Container>
    </Modal>
  );
};

export default EditChannelModal;
