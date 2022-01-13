import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  height: 100%;
  min-width: 240px;
  background-color: #2f3136;
  flex-direction: column;
  padding-left: 8px;

  h2 {
    color: #8e9297;
    font-family: var(--font-display);
    padding: 24px 8px 16px;
    height: 40px;
    font-size: 12px;
    text-transform: uppercase;
    letter-spacing: 0.25px;
    font-weight: 600;
    line-height: 16px;
    text-overflow: ellipsis;
  }
`;

export const UserContainer = styled.div`
  height: 42px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
  border-radius: 4px;
  padding: 0 8px;
  cursor: pointer;

  :hover {
    background-color: rgba(79, 84, 92, 0.32);
  }
`;

export const ProfileImage = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  flex: 0 0 auto;
  margin-right: 12px;
`;

export const UserContent = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 225px;
`;

export const Username = styled.span`
  color: ${(props) => props.color};
  justify-content: flex-start;
  align-items: center;
  display: flex;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 16px;
  line-height: 20px;
  font-weight: 500;
  flex: 0 1 auto;
`;

export const Legend = styled.div`
  font-weight: 500;
  color: #8e9297;
  line-height: 16px;
  font-size: 12px;
  overflow: hidden;
  text-overflow: ellipsis;
`;
