import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 60px 40px 80px;
  height: 100%;
  width: 100%;
`;

export const Content = styled.div`
  display: flex;
  justify-content: space-between;
  height: 100%;
  width: 80%;
  padding: 20px;
`;

export const UserSettingsDetailsColumn = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  height: 100%;
  margin-right: 30px;
  min-width: 550px;

  h2 {
    text-transform: uppercase;
    color: #fff;
    font-size: 16px;
    line-height: 20px;
    margin-bottom: 20px;
  }

  h5 {
    text-transform: uppercase;
    color: #b9bbbe;
    font-size: 12px;
    line-height: 16px;
    margin-bottom: 8px;
  }

  input[type="text"] {
    padding: 10px;
    height: 40px;
    font-size: 16px;
    width: 100%;
    color: #dcddde;
    border-radius: 3px;
    background-color: #313339;
    border: 1px solid #040405;
    margin-bottom: 20px;
  }

  input[type="color"] {
    margin-bottom: 10px;
  }

  textarea {
    padding: 10px;
    height: 150px;
    font-size: 16px;
    width: 100%;
    color: #dcddde;
    border-radius: 3px;
    background-color: #313339;
    border: 1px solid #040405;
    margin-bottom: 20px;
    resize: none;
    overflow-y: scroll;
  }

  p {
    color: #b9bbbe;
    font-size: 14px;
    line-height: 20px;
    font-weight: 400;
    margin-bottom: 10px;
  }
`;

export const UserSettingImageColumn = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 200px;
  margin-left: 20px;

  //background-color: #292b2f;

  img {
    position: relative;
    border-radius: 50%;
    width: 80px;
    height: 80px;
    border: 6px solid #18191c;
    top: -25px;
    left: 16px;
  }
`;

export const MiniUserProfile = styled.div`
  background-color: #18191c;
  width: 240px;
  height: 320px;
  border-radius: 8px;

  h3 {
    padding: 10px;

    text-transform: uppercase;
    color: #b9bbbe;
    margin-bottom: 8px;
    font-size: 12px;
    line-height: 16px;
  }
`;

export const AboutMe = styled.div`
  margin: auto;
  color: #bbbcbd;
  width: 220px;
  max-height: 100px;
  overflow-y: scroll;
  margin-bottom: 10px;
`;

export const UserBannerDisplay = styled.div`
  background-size: contain;
  height: 60px;
  width: 240px;
  border: 2px solid #43424a;
  border-radius: 8px 8px 0 0;
`;

export const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-self: flex-end;
  height: 100%;

  .cancel-button {
    width: auto;
    height: 38px;
    color: #fff;
    min-width: 96px;
    min-height: 38px;
    font-size: 14px;
    font-weight: 500;
    line-height: 16px;
    padding: 2px 16px;
    border: none;
    border-radius: 3px;
    background: none;
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  }

  .create-button {
    width: auto;
    height: 38px;
    transition: background-color 0.17s ease, color 0.17s ease;
    border: none;
    border-radius: 3px;
    font-size: 14px;
    font-weight: 500;
    line-height: 16px;
    padding: 2px 16px;

    &.active {
      color: #fff;
      background-color: #5865f2;
      cursor: pointer;

      &:hover {
        background-color: #4955d6;
      }

      &:active {
        background-color: #3e49c2;
      }
    }

    &.disabled {
      color: #91939a;
      background-color: #434b94;
      cursor: not-allowed;
    }
  }
`;
