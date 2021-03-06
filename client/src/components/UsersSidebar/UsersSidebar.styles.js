import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  height: 100%;
  min-width: 240px;
  background-color: #2f3136;
  flex-direction: column;
  padding-left: 8px;
  overflow-y: auto;

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
  margin-right: 12px;
  margin-top: 10px;
  border-radius: 4px;
  padding: 0 8px;
  cursor: pointer;

  :hover {
    background-color: rgba(79, 84, 92, 0.32);
  }
`;

export const ProfileImage = styled.div`
  img {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    flex: 0 0 auto;
    margin-right: 12px;
    margin-top: 5px;
    background-color: ${(props) => props.backgroundColor};
    pointer-events: none;
  }
`;

export const OnlineStatusIndicatorIcon = styled.div`
  width: 15px;
  height: 15px;
  border-radius: 50%;
  position: relative;
  top: -15px;
  left: 20px;
  border: 3px solid #2f3136;
  cursor: pointer;

  &.online {
    background-color: #3ba55d;
  }

  &.offline {
    display: none;
  }

  &.idle {
    background-color: #faa81a;
  }

  &.do-not-disturb {
    background-color: #ed4245;
  }
`;

export const UserContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  width: 225px;
  pointer-events: none;
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

export const Legend = styled.span`
  width: 160px;
  font-weight: 500;
  color: #8e9297;
  line-height: 16px;
  font-size: 12px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;
