import React from "react";
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
} from "./ServerSettingsModal.styles";
// Assets
import { ReactComponent as CloseIcon } from "../../assets/close-icon.svg";
import { useState } from "react";

const ServerSettingsModal = ({
  closeModal,
  data,
  server,
  onEditServerSettings,
  onClickDeleteServer,
}) => {
  const [newServerName, setNewServerName] = useState("");

  if (!data) {
    return <></>;
  }

  const onNewChangeServerName = (e) => {
    setNewServerName(e.target.value);
  };

  const onClickConfirm = () => {
    if (newServerName.length > 0) {
      onEditServerSettings(server._id, { name: newServerName });
      closeModal();
    }
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
              <h3>{server.name}</h3>
            </OptionSidebarHeader>
            <div>
              <p>Overview</p>
              <p>Roles</p>
            </div>
            <Divider />
            <div>
              <p>Memners</p>
              <p>Invites</p>
              <p>Bans</p>
            </div>
            <Divider />
            <DeleteButton>
              <p onClick={onClickDeleteServer(server._id)}>Delete Server</p>
            </DeleteButton>
          </OptionSidebarContainer>
        </OptionSidebar>
        <Content>
          <h2>Overview</h2>
          <h5>Server Name</h5>
          <input
            autoFocus
            value={newServerName}
            placeholder={server.name}
            onChange={onNewChangeServerName}
          />
          <Footer>
            <button onClick={closeModal} className="cancel-button">
              Cancel
            </button>
            <button
              className={`create-button ${
                newServerName.length > 0 ? "active" : "disabled"
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

export default ServerSettingsModal;
