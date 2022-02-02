import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: "0, 0, 0, 0.24";
  background-color: #36393f;
  border-radius: 8px;
  border-width: 0;
  width: 100%;
  height: 100%;
  border-radius: "6px";
  padding-top: 18px;
  box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.2);
`;

export const Header = styled.div`
  text-align: center;
  margin-bottom: 16px;
  padding: 16px;
  color: #fff;
  font-size: 24px;
  line-height: 30px;
`;

export const Content = styled.div`
  padding: 0 16px 0 16px;

  h5 {
    text-transform: uppercase;
    color: #dcddde;
    font-size: 12px;
    line-height: 16px;
    margin-bottom: 8px;
  }

  input {
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

  p {
    color: #b9bbbe;
    font-size: 14px;
    line-height: 20px;
    font-weight: 400;
    margin-bottom: 10px;
  }
`;

export const PrivateCategory = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  background-color: #2f3136;
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

    &:hover {
      text-decoration: underline;
    }
  }

  .create-category-button {
    color: #91939a;
    width: auto;
    height: 38px;
    background-color: #434b94;
    transition: background-color 0.17s ease, color 0.17s ease;
    border: none;
    border-radius: 3px;
    font-size: 14px;
    font-weight: 500;
    line-height: 16px;
    padding: 2px 16px;
    cursor: not-allowed;

    &:hover {
      color: #fff;
      background-color: #5865f2;
    }
  }
`;
