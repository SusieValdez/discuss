import React, { useState } from "react";
// Styles
import {
  Container,
  Content,
  UserSettingsDetailsColumn,
  UserSettingImageColumn,
  MiniUserProfile,
  UserBannerDisplay,
  Footer,
  AboutMe,
} from "./UserProfile.styles";

const UserProfile = ({ user, onEditUserAccount }) => {
  const [newAboutMe, setNewAboutMe] = useState(user.aboutMe);
  const [newAvatarUrl, setNewAvatarUrl] = useState(user.avatarUrl);
  const [newBannerColor, setNewBannerColor] = useState(user.bannerColor);
  const [newBannerImageUrl, setNewBannerImageUrl] = useState(
    user.bannerImageUrl
  );

  const onCancel = () => {
    setNewAboutMe(user.aboutMe);
    setNewAvatarUrl(user.avatarUrl);
    setNewBannerColor(user.bannerColor);
    setNewBannerImageUrl(user.bannerImageUrl);
  };

  const validStateChange =
    newAboutMe !== user.aboutMe ||
    newAvatarUrl !== user.avatarUrl ||
    newBannerColor !== user.bannerColor ||
    newBannerImageUrl !== user.bannerImageUrl;

  const onClickConfirm = () => {
    if (validStateChange) {
      onEditUserAccount({
        aboutMe: newAboutMe,
        avatarUrl: newAvatarUrl,
        bannerColor: newBannerColor,
        bannerImageUrl: newBannerImageUrl,
      });
    }
  };

  return (
    <Container>
      <Content>
        <UserSettingsDetailsColumn>
          <h2>User Profile</h2>
          <h5>Avatar</h5>
          <input
            type="text"
            value={newAvatarUrl}
            placeholder="http://imgur.com/mycoolprofilepic"
            onChange={(e) => setNewAvatarUrl(e.target.value)}
          />
          <h5>Banner Color</h5>
          <input
            type="color"
            value={newBannerColor}
            onChange={(e) => setNewBannerColor(e.target.value)}
          />
          <h5>Banner Image</h5>
          <input
            type="text"
            value={newBannerImageUrl}
            placeholder="https://imgur.com/myepicbanner.jpg"
            onChange={(e) => setNewBannerImageUrl(e.target.value)}
          />
          <h5>About Me</h5>
          <textarea
            value={newAboutMe}
            placeholder="Write something epic about yourself!"
            onChange={(e) => setNewAboutMe(e.target.value)}
          />
        </UserSettingsDetailsColumn>
        <UserSettingImageColumn>
          <MiniUserProfile>
            <UserBannerDisplay
              style={{
                background: newBannerImageUrl
                  ? `url(${newBannerImageUrl})`
                  : newBannerColor,
              }}
              alt="new banner image"
            />
            <img
              src={newAvatarUrl || "/default-user-logo.svg"}
              alt="new avatar url"
              style={{
                backgroundColor: newAvatarUrl ? "#18191c" : newBannerColor,
              }}
            />
            <h3>About Me</h3>
            <AboutMe>
              {newAboutMe.split("\n").map((row, i) => (
                <p key={i}>{row}</p>
              ))}
            </AboutMe>
          </MiniUserProfile>
        </UserSettingImageColumn>
      </Content>
      <Footer>
        <button onClick={onCancel} className="cancel-button">
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
    </Container>
  );
};

export default UserProfile;
