import { React, useState } from "react";
// Styles
import {
  Content,
  ServerSettingsForm,
  ImageColumn,
  ServerSettingsIcons,
  Footer,
} from "./Overview.styles";

const Overview = ({ server, onEditServerSettings }) => {
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

  const validStateChange =
    (newServerName !== server.name && newServerName.length > 0) ||
    newServerDescription !== server.description ||
    newServerIcon !== server.iconUrl ||
    newServerBannerColor !== server.bannerColor ||
    newServerBannerImageUrl !== server.bannerImageUrl;

  const onClickConfirm = () => {
    if (validStateChange) {
      onEditServerSettings(server._id, {
        name: newServerName,
        description: newServerDescription,
        iconUrl: newServerIcon,
        bannerColor: newServerBannerColor,
        bannerImageUrl: newServerBannerImageUrl,
      });
    }
  };

  const onClickCancel = () => {
    setNewServerName(server.name);
    setNewServerDescription(server.description);
    setNewServerIcon(server.iconUrl);
    setNewServerBannerColor(server.bannerColor);
    setNewServerBannerImageUrl(server.bannerImageUrl);
  };

  return (
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
          <button onClick={onClickCancel} className="cancel-button">
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
  );
};

export default Overview;
