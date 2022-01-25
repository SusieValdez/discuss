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
  background-color: #36393f;
  color: #72767d;
  width: 480px;
  height: 562px;
  padding: 32px;
  border-radius: 5px;
  box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.2);

  p {
    font-size: 12px;
    color: #72767;
  }

  a {
    color: #00aff4;
  }
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

  button {
    background-color: #5865f2;
    color: #fff;
    font-size: 16px;
    font-weight: 500;
    line-height: 24px;
    margin-top: 20px;
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
    font-size: 14px;
    margin-bottom: 20px;
  }

  a {
    color: #00aff4;
  }
`;

export const SelectMenu = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  select {
    width: 100px;
    background-color: rgba(0, 0, 0, 0.1);
    border-style: solid;
    border-width: 1px;
    border-color: rgba(32, 34, 37, 0.5);
    border-radius: 4px;
    min-height: 40px;
    color: rgb(114, 118, 125);
    padding-left: 4px;
    transition: border 0.15s ease 0s;
  }

  select:hover {
    border-color: rgba(0, 0, 0, 0.5);
  }

  option {
  }
`;
