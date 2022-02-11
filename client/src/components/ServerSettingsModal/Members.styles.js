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

export const MembersSearchTools = styled.div`
  display: flex;
  justify-content: space-between;
  color: #b9bbbe;

  p {
    font-size: 14px;
    line-height: 20px;
    font-weight: 400;
  }

  > div {
    display: flex;
    justify-content: space-between;
    width: 150px;
  }
`;

export const UserListContainer = styled.div`
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

  span {
    font-size: 12px;
    line-height: 18px;
    margin-left: 8px;
    color: #b9bbbe;
  }
`;

export const MemberRoles = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
`;

export const RoleDiv = styled.div`
  display: flex;
  background-color: #292b2f;
  border-radius: 4px;
  height: 22px;
  max-width: 200px;
  text-overflow: ellipsis;
  margin: 0 4px 4px 0;
  padding: 4px;
  align-items: center;
  color: #d6d7d7;
  font-size: 12px;
`;

export const RoleDot = styled.div`
  width: 12px;
  height: 12px;
  margin-right: 8px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;
