import styled from "styled-components";

export const Container = styled.div``;

export const SearchSection = styled.div`
  display: flex;
  align-items: center;
  text-align: left;
  justify-content: space-between;
  margin-bottom: 20px;

  input {
    background-color: #202225;
    border: none;
    min-width: 65%;
    height: 34px;
    border-radius: 4px;
    padding: 10px;
    color: #dcddde;
    outline: none;
  }
`;

export const ButtonAddMembers = styled.div`
  display: flex;
  align-items: center;
  background-color: #5865f2;
  justify-content: center;
  width: 200px;
  color: #fff;
  height: 38px;
  transition: background-color 0.17s ease, color 0.17s ease;
  border: none;
  border-radius: 3px;
  font-size: 14px;
  font-weight: 500;
  line-height: 16px;
  padding: 5px 16px;
  margin-left: 32px;
  margin-bottom: 20px;
  cursor: pointer;

  :hover {
    background-color: #4752c4;
  }

  :active {
    background-color: #3a42a0;
  }
`;

export const MembersList = styled.div`
  overflow-y: auto;
`;

export const MemberRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 4px;
  height: 40px;
  padding: 8px;

  &:hover {
    background-color: #393d44;
  }

  svg {
    color: #b9bbbe;
    width: 20px;
    height: 20px;
    padding: 2px;
  }
`;

export const MemberDetails = styled.div`
  display: flex;
  align-items: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: pointer;

  h2 {
    color: #fff;
    margin-left: 8px;
    font-weight: 600;
    font-size: 14px;
    line-height: 18px;
  }

  img {
    width: 24px;
    height: 24px;
    border-radius: 50%;
  }

  span {
    font-size: 12px;
    line-height: 18px;
    margin-left: 8px;
    color: #b9bbbe;
  }
`;
