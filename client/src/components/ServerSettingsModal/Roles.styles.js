import styled from "styled-components";

export const Container = styled.div`
  height: 100%;
  width: 100%;
  overflow-y: scroll;
`;

export const Content = styled.div`
  padding: 60px;
  width: 90%;

  h1 {
    margin-bottom: 20px;
    color: #fff;
    font-size: 20px;
    line-height: 24px;
  }

  > p {
    margin-bottom: 16px;
    color: #b9bbbe;
    font-size: 14px;
    line-height: 18px;
  }

  input {
    background-color: #202225;
    margin: 15px 15px 15px 0;
    border: none;
    min-width: 65%;
    height: 34px;
    border-radius: 4px;
    padding: 10px;
    color: #dcddde;
    outline: none;
  }
`;

export const DefaultPermissions = styled.div`
  display: flex;
  align-items: center;
  text-align: left;
  justify-content: space-between;
  background-color: #2f3136;
  color: #b9bbbe;
  border-radius: 4px;
  padding: 16px 24px 16px 16px;
  margin-bottom: 16px;
  cursor: pointer;

  :hover {
    background-color: #393d44;
  }

  > div {
    p {
      font-size: 12px;
    }
  }

  h3 {
    font-size: 14px;
    margin-bottom: 5px;
  }

  svg {
    width: 22px;
    height: 22px;
  }
`;

export const CreateNewRole = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;

  svg {
    position: relative;
    left: -20px;
    background-color: #202225;
    height: 34px;
    padding: 6px;
    border-radius: 4px;
  }
`;

export const ButtonCreateRole = styled.div`
  display: flex;
  align-items: center;
  background-color: #5865f2;
  justify-content: center;
  width: 150px;
  color: #fff;
  height: 34px;
  transition: background-color 0.17s ease, color 0.17s ease;
  border: none;
  border-radius: 3px;
  font-size: 14px;
  font-weight: 500;
  line-height: 16px;
  padding: 2px 16px;
  margin-left: 32px;
  cursor: pointer;

  :hover {
    background-color: #4752c4;
  }

  :active {
    background-color: #3a42a0;
  }
`;

export const RolesContainer = styled.div``;

export const RolesTitles = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-top: 50px;
  padding-bottom: 10px;
  border-bottom: 1px solid #b9bbbe;

  h4 {
    width: 400px;
    font-size: 12px;
    color: #b9bbbe;
    text-transform: uppercase;
  }
`;

export const RoleRow = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border-bottom: 1px solid #b9bbbe;
  height: 60px;
  cursor: pointer;

  h2 {
    width: 400px;
    font-size: 16px;
    line-height: 20px;
    font-weight: 500;
    color: #fff;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  span {
    font-size: 14px;
    line-height: 20px;
    color: #b9bbbe;
  }

  .svg-icon {
    margin-left: 10px;
    color: #b9bbbe;
    width: 20px;
    height: 20px;
  }
`;
