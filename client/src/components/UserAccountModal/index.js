import React from "react";
import Modal from "react-modal";
// Components
import MyAccount from "./MyAccount";
// Styles
import {
  Container,
  OptionSidebar,
  OptionSidebarContainer,
  OptionSidebarHeader,
  Divider,
  RedButton,
  IconContainer,
} from "./UserAccountModal.styles";
// Assets
import { ReactComponent as CloseIcon } from "../../assets/close-icon.svg";
import { useState } from "react";
import UserProfile from "./UserProfile";

const UserAccountModal = ({
  closeModal,
  data,
  user,
  onEditUserAccount,
  onClickLogout,
}) => {
  const [subsectionName, setSubsectionName] = useState("My Account");

  const onAfterClose = () => {
    setSubsectionName("My Account");
  };

  if (!data) {
    return <></>;
  }

  let content;
  switch (subsectionName) {
    case "My Account":
      content = <MyAccount user={user} onEditUserAccount={onEditUserAccount} />;
      break;
    case "User Profile":
      content = (
        <UserProfile user={user} onEditUserAccount={onEditUserAccount} />
      );
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
        <OptionSidebar>
          <OptionSidebarContainer>
            <OptionSidebarHeader>
              <h3>{user.name}</h3>
            </OptionSidebarHeader>
            <div>
              <p onClick={() => setSubsectionName("My Account")}>My Account</p>
              <p onClick={() => setSubsectionName("User Profile")}>
                User Profile
              </p>
            </div>
            <Divider />
            <RedButton>
              <p onClick={onClickLogout}>Log Out</p>
            </RedButton>
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

export default UserAccountModal;
