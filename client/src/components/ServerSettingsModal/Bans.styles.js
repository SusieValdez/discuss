import styled from "styled-components";

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 60%;
  padding: 40px;

  h1 {
    color: #fff;
    margin-bottom: 20px;
    font-size: 20px;
    line-height: 24px;
  }
`;

export const UserBanList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 15px 0 15px 0;
  width: 100%;

  overflow-y: auto;

  .line-break {
    border-top: 3px solid #3a3d43;
    margin: 10px 0 10px 0;
  }
`;

export const MemberRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 4px;
  height: 40px;

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
`;
