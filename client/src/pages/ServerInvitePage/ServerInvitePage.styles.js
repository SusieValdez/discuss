import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  background: url(${(props) => props.background});
  justify-content: center;
  align-items: center;
`;

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #36393f;
  color: #72767d;
  width: 480px;
  height: auto;
  padding: 32px;
  border-radius: 5px;
  box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.2);
`;

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: center;

  h3 {
    color: #fff;
    font-weight: 600;
    font-size: 24px;
  }

  p {
    font-size: 16px;
    color: #b9bbbe;
    margin: 10px;
  }

  div {
    margin: auto;
    background-color: #4752c4;
    border-radius: 16px;
    width: 64px;
    height: 64px;
  }
`;

export const ServerInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-bottom: 10px;
`;

export const Members = styled.div`
  display: flex;
  justify-content: center;

  p {
    font-size: 16px;
    color: #b9bbbe;
    line-height: 18px;
  }

  div {
    display: flex;
    align-items: center;
    margin: 10px;
  }

  .online {
    width: 10px;
    height: 10px;
    margin-right: 8px;
    border-radius: 50%;
    background-color: #1a981e;
  }

  .offline {
    width: 10px;
    height: 10px;
    margin-right: 8px;
    border-radius: 50%;
    background-color: #b9bbbe;
  }
`;

export const AcceptButton = styled.button`
  width: 416px;
  height: 44px;
  transition: background-color 0.17s ease, color 0.17s ease;
  border: none;
  border-radius: 3px;
  font-size: 14px;
  font-weight: 500;
  line-height: 16px;
  padding: 2px 16px;
  background-color: #5865f2;
  color: #fafbfe;
  cursor: pointer;

  &:hover {
    background-color: #4752c4;
  }

  &:active {
    background-color: #3b439d;
  }
`;
