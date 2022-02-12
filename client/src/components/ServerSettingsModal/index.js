import React from "react";
import { useState } from "react";
import Modal from "react-modal";
// Components
import Overview from "./Overview";
import Roles from "./Roles";
import Members from "./Members";
import Bans from "./Bans";
// Styles
import {
  Container,
  OptionSidebar,
  OptionSidebarContainer,
  OptionSidebarHeader,
  Divider,
  DeleteButton,
  IconContainer,
} from "./ServerSettingsModal.styles";
// Assets
import { ReactComponent as CloseIcon } from "../../assets/close-icon.svg";

const ServerSettingsModal = ({
  closeModal,
  data,
  server,
  serverUsers,
  onClickDeleteServer,
  onClickAddRole,
  onClickDeleteRole,
  onEditServerSettings,
  onAddNewRoleToUser,
  onRemoveRoleFromUser,
}) => {
  const [subsectionName, setSubsectionName] = useState("Overview");

  const onAfterClose = () => {
    setSubsectionName("Overview");
  };

  if (!data) {
    return <></>;
  }

  let content;
  switch (subsectionName) {
    case "Overview":
      content = (
        <Overview server={server} onEditServerSettings={onEditServerSettings} />
      );
      break;
    case "Roles":
      content = (
        <Roles
          users={serverUsers}
          roles={server.roles}
          onClickAddRole={onClickAddRole}
          onClickDeleteRole={onClickDeleteRole}
          onAddNewRoleToUser={onAddNewRoleToUser}
          onRemoveRoleFromUser={onRemoveRoleFromUser}
        />
      );
      break;
    case "Members":
      content = <Members users={serverUsers} roles={server.roles} />;
      break;
    case "Bans":
      content = <Bans users={serverUsers} />;
      break;
    default:
      break;
  }

  return (
    <Modal
      isOpen={true}
      onRequestClose={closeModal}
      onAfterClose={onAfterClose}
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
        <IconContainer>
          <CloseIcon onClick={closeModal} />
        </IconContainer>
        <OptionSidebar>
          <OptionSidebarContainer>
            <OptionSidebarHeader>
              <h3>{server.name}</h3>
            </OptionSidebarHeader>
            <div>
              <p onClick={() => setSubsectionName("Overview")}>Overview</p>
              <p onClick={() => setSubsectionName("Roles")}>Roles</p>
            </div>
            <Divider />
            <div>
              <p onClick={() => setSubsectionName("Members")}>Members</p>
              <p onClick={() => setSubsectionName("Bans")}>Bans</p>
            </div>
            <Divider />
            <DeleteButton>
              <p onClick={onClickDeleteServer(server._id)}>Delete Server</p>
            </DeleteButton>
          </OptionSidebarContainer>
        </OptionSidebar>

        {content}
        <IconContainer>
          <CloseIcon onClick={closeModal} />
        </IconContainer>
      </Container>
    </Modal>
  );
};

export default ServerSettingsModal;
