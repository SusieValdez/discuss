import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 240px;
  background-color: #2f3136;
  justify-content: space-between;
`;

export const Header = styled.div`
  font-weight: 500;
  padding: 0 16px;
  height: 48px;
  display: flex;
  align-items: center;
  color: #fff;
  box-shadow: 0 1px 0 rgba(4, 4, 5, 0.2), 0 1.5px 0 rgba(6, 6, 7, 0.05),
    0 2px 0 rgba(4, 4, 5, 0.05);
  cursor: pointer;
`;

export const UserPanel = styled.div`
  display: flex;
  flex-direction: row;
  background-color: #292b2f;
  weight: 240px;
  height: 53px;
  justify-content: space-between;
  align-items: center;
  padding: 0 8px;
`;

export const UserTag = styled.div`
  display: flex;
  align-items: center;

  img {
    width: 32px;
    height: 32px;
    cursor: pointer;
    border-radius: 50%;

    :hover {
      opacity: 0.8;
    }
  }

  div {
    margin-left: 8px;
  }

  h3 {
    font-size: 14px;
    cursor: pointer;
    color: #fff;
    font-weight: 600px;
  }

  p {
    font-size: 12px;
    color: #b9bbbe;
    width: 130px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`;

export const IconContainer = styled.div`
  display: flex;
  width: 32px;
  height: 32px;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  border-radius: 4px;

  :hover {
    background-color: rgba(79, 84, 92, 0.32);
  }

  img {
    width: 16px;
    height: 16px;
  }
`;
