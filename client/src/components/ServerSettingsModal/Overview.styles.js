import styled from "styled-components";

export const Content = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  min-width: 1000px;
  padding: 40px;
`;

export const ServerSettingsForm = styled.div`
  display: flex;
  width: 800px;
  flex: 1;
  flex-direction: column;

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
    margin-bottom: 20px;
  }

  textarea {
    padding: 10px;
    height: 100px;
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

export const ImageColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  min-width: 40%;
`;

export const ServerSettingsIcons = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 600px;

  .server-banner-image {
    height: 70px;
    width: 300px;
  }

  .server-icon-container {
    background-color: #4f545c;
    width: 100px;
    height: 100px;
    border-radius: 50%;
  }

  .server-icon-image {
    margin: auto;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    border: 2px solid #7e8389;
  }

  .server-banner-color {
    margin-top: 30px;
    width: 300px;
    height: 143px;
    border-radius: 8px;
  }
`;

export const Minibanner = styled.div`
  height: 70px;
  background-color: ${(props) => props.backgroundColor};
  width: 80%;
  margin-top: 30px;
  border-radius: 8px, 8px, 0, 0;
`;

export const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  width: auto;
  padding: 16px;

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
