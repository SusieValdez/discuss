import React from "react";
import Modal from "react-modal";
// Styles
import {
  Container,
  OptionSidebar,
  OptionSidebarContainer,
  OptionSidebarHeader,
  Divider,
  RedButton,
  IconContainer,
  Content,
  Footer,
} from "./UserAccountModal.styles";
// Assets
import { ReactComponent as CloseIcon } from "../../assets/close-icon.svg";
import { useState } from "react";

const UserAccountModal = ({
  closeModal,
  data,
  user,
  onEditUserAccount,
  onClickLogout,
}) => {
  const [newUserName, setNewUserName] = useState(user.name);
  const [newLegend, setNewLegend] = useState(user.legend);
  const [newAvatarUrl, setNewAvatarUrl] = useState(user.avatarUrl);

  const validStateChange =
    (newUserName !== user.name && newUserName.length > 0) ||
    newLegend !== user.legend ||
    newAvatarUrl !== user.avatarUrl;

  if (!data) {
    return <></>;
  }

  const onClickConfirm = () => {
    if (validStateChange) {
      onEditUserAccount({
        name: newUserName,
        legend: newLegend,
        avatarUrl: newAvatarUrl,
      });
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
              <h3>{user.name}</h3>
            </OptionSidebarHeader>
            <div>
              <p>My Account</p>
              <p>User Profile</p>
            </div>
            <Divider />
            <RedButton>
              <p onClick={onClickLogout}>Log Out</p>
            </RedButton>
          </OptionSidebarContainer>
        </OptionSidebar>
        <Content>
          <h2>Overview</h2>
          <h5>Username</h5>
          <input
            autoFocus
            value={newUserName}
            placeholder={user.name}
            onChange={(e) => setNewUserName(e.target.value)}
          />
          <h5>Avatar</h5>
          <input
            autoFocus
            value={newAvatarUrl}
            placeholder="http://imgur.com/mycoolprofilepic"
            onChange={(e) => setNewAvatarUrl(e.target.value)}
          />
          <img src={newAvatarUrl} alt="new avatar url" />
          <h5>Legend</h5>
          <textarea
            value={newLegend}
            placeholder={user.legend || "Server description"}
            onChange={(e) => setNewLegend(e.target.value)}
          />
          <Footer>
            <button onClick={closeModal} className="cancel-button">
              Cancel
            </button>
            <button
              className={`create-button ${
                validStateChange ? "active" : "disabled"
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

export default UserAccountModal;
