import React from "react";
import { useState } from "react";
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
  ServerSettingsForm,
  ServerSettingsIcons,
  Footer,
  ImageColumn,
} from "./ServerSettingsModal.styles";
// Assets
import { ReactComponent as CloseIcon } from "../../assets/close-icon.svg";

const ServerSettingsModal = ({
  closeModal,
  data,
  server,
  onEditServerSettings,
  onClickDeleteServer,
}) => {
  const [newServerName, setNewServerName] = useState(server.name);
  const [newServerDescription, setNewServerDescription] = useState(
    server.description
  );
  const [newServerIcon, setNewServerIcon] = useState(server.iconUrl);
  const [newServerBannerColor, setNewServerBannerColor] = useState(
    server.bannerColor
  );
  const [newServerBannerImageUrl, setNewServerBannerImageUrl] = useState(
    server.bannerImageUrl
  );

  const validStateChange =
    (newServerName !== server.name && newServerName.length > 0) ||
    newServerDescription !== server.description ||
    newServerIcon !== server.iconUrl ||
    newServerBannerColor !== server.bannerColor ||
    newServerBannerImageUrl !== server.bannerImageUrl;

  if (!data) {
    return <></>;
  }

  const onChangeNewServerBannerColor = (e) => {
    setNewServerBannerColor(e.target.value);
  };

  const onChangeNewServerIcon = (e) => {
    setNewServerIcon(e.target.value);
  };

  const onNewChangeServerName = (e) => {
    setNewServerName(e.target.value);
  };

  const onChangeNewServerBannerIcon = (e) => {
    setNewServerBannerImageUrl(e.target.value);
  };

  const onNewChangeServerDescription = (e) => {
    setNewServerDescription(e.target.value);
  };

  const onClickConfirm = () => {
    if (validStateChange) {
      onEditServerSettings(server._id, {
        name: newServerName,
        description: newServerDescription,
        iconUrl: newServerIcon,
        bannerColor: newServerBannerColor,
        bannerImageUrl: newServerBannerImageUrl,
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
              <h3>{server.name}</h3>
            </OptionSidebarHeader>
            <div>
              <p>Overview</p>
              <p>Roles</p>
            </div>
            <Divider />
            <div>
              <p>Members</p>
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
          <ServerSettingsForm>
            <div>
              <h2>Overview</h2>
              <h5>Server Name</h5>
              <input
                type="text"
                autoFocus
                value={newServerName}
                placeholder={server.name}
                onChange={onNewChangeServerName}
              />
              <h5>Server Icon</h5>
              <div>
                <input
                  type="text"
                  value={newServerIcon}
                  placeholder="https://imgur.com/mycoolprofilepic.jpg"
                  onChange={onChangeNewServerIcon}
                />
              </div>

              <h5>Server Banner Color</h5>
              <input
                type="color"
                value={newServerBannerColor}
                onChange={onChangeNewServerBannerColor}
              />
              <h5>Server Description</h5>
              <textarea
                value={newServerDescription}
                placeholder={
                  server.description ? server.description : "Server description"
                }
                onChange={onNewChangeServerDescription}
              />

              <h5>Server Banner Image</h5>
              <input
                type="text"
                value={newServerBannerImageUrl}
                placeholder="https://imgur.com/mycoolbackground.jpg"
                onChange={onChangeNewServerBannerIcon}
              />
            </div>
          </ServerSettingsForm>

          <ImageColumn>
            <IconContainer>
              <CloseIcon onClick={closeModal} />
            </IconContainer>
            <ServerSettingsIcons>
              <div className="server-icon-container">
                <img
                  className="server-icon-image"
                  style={{ backgroundColor: newServerBannerColor }}
                  src={newServerIcon || "/default-user-logo.svg"}
                  alt="new server icon"
                />
              </div>
              <div
                className="server-banner-color"
                style={{
                  background: newServerBannerImageUrl
                    ? `url(${newServerBannerImageUrl})`
                    : newServerBannerColor,
                }}
              />
            </ServerSettingsIcons>
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
          </ImageColumn>
        </Content>
      </Container>
    </Modal>
  );
};

export default ServerSettingsModal;
