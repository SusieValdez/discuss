import React, { useState } from "react";
// Styles
import { Content, Footer } from "./UserProfile.styles";

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
    <Content>
      <h2>User Profile</h2>
      <h5>Avatar</h5>
      <input
        type="text"
        value={newAvatarUrl}
        placeholder="http://imgur.com/mycoolprofilepic"
        onChange={(e) => setNewAvatarUrl(e.target.value)}
      />
      <img src={newAvatarUrl} alt="new avatar url" />
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
    </Content>
  );
};

export default UserProfile;
