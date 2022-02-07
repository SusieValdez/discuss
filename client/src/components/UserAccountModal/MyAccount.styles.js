import styled from "styled-components";

export const Content = styled.div`
  padding: 60px 40px 80px;
  max-width: 740px;
  width: 740px;
  min-width: 460px;
  min-height: 100%;

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

  input[type="text"], input[type="password"] {
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
  } */
`;

export const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  height: 70px;
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
