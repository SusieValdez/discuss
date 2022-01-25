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
  flex-direction: row;
  justify-content: space-between;
  background-color: #36393f;
  color: #72767d;
  width: 784px;
  height: 408px;
  padding: 32px;
  border-radius: 5px;
  box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.2);
`;

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  width: 100%;
  margin-bottom: -20px;

  h3 {
    color: #fff;
    font-weight: 600;
    margin-bottom: 8px;
    font-size: 24px;
  }

  p {
    font-size: 16px;
    color: #b9bbbe;
  }
`;

export const AccountInfo = styled.div`
  display: flex;
  flex-direction: column;
  width: 55%;
  height: auto;
  flex-direction: column;

  button {
    background-color: #5865f2;
    color: #fff;
    font-size: 16px;
    font-weight: 500;
    line-height: 24px;
    margin-bottom: 8px;
    border: none;
    border-radius: 5px;
    min-height: 44px;
    min-width: 130px;
    transition: background-color 0.17s ease, color 0.17s ease;
    cursor: pointer;

    &:hover {
      background-color: #4752c4;
    }
  }

  p {
    margin-bottom: 20px;
    margin-top: 4px;
    font-size: 14px;
  }

  a {
    color: #00aff4;
  }
`;

export const InputField = styled.div`
  display: flex;
  flex-direction: column;

  h5 {
    color: #b9bbbe;
    text-transform: uppercase;
    margin-top: 20px;
    margin-bottom: 8px;
  }

  input {
    background-color: rgba(0, 0, 0, 0.1);
    font-size: 16px;
    width: 100%;
    border-radius: 3px;
    color: #dcddde;
    padding: 10px;
    height: 40px;
    border: 1px solid #040405;
  }
`;

export const QrLogin = styled.div`
  display: flex;
  flex-direction: column;
  width: 240px;
  height: 344px;
  justify-content: center;
  align-items: center;
  text-align: center;

  h3 {
    margin-bottom: 8px;
    font-size: 24px;
    line-height: 30px;
    color: #fff;
  }

  p {
    font-size: 16px;
    line-height: 20px;
    color: #b9bbbe;
  }
`;

export const QrContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 32px;
  width: 176px;
  height: 176px;
  background-color: #fff;
  border-radius: 4px;
`;
