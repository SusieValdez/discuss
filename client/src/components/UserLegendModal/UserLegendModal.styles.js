import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  justify-content: center;

  svg {
    width: 24px;
    height: 24px;
    color: #a6a9ae;
    cursor: pointer;
    position: absolute;
    top: 20px;
    right: 20px;
  }
`;

export const Content = styled.div`
  padding: 10px 18px;
  text-align: center;
  margin: 30px 0px;

  h1 {
    font-size: 20px;
    line-height: 24px;
    font-weight: 600;
    color: #ffffff;
  }

  h5 {
    text-align: left;
    text-transform: uppercase;
    color: #b9bbbe;
    font-size: 12px;
    line-height: 16px;
    margin-bottom: 8px;
    margin-top: 24px;
  }

  strong {
    font-weight: 600;
  }

  input {
    padding: 10px;
    height: 40px;
    font-size: 16px;
    width: 100%;
    color: #dcddde;
    border-radius: 3px;
    background-color: #313339;
    border: 1px solid #23252a;
    margin-bottom: 10px;
  }

  p {
    color: #575d67;
    font-size: 14px;
    line-height: 20px;
    font-weight: 400;
    margin-top: 8px;
    padding-bottom: 20px;
  }
`;

export const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 20px;
  width: 100%;
  height: 70px;
  background-color: #2f3136;
  margin-top: 30px;
`;

export const BackButton = styled.button`
  padding: 2px 4px;
  background-color: transparent;
  color: #ffffff;
  border: none;
  cursor: pointer;
  height: 38px;
  min-width: 96px;
  min-height: 38px;
`;

export const CreateButton = styled.button`
  background-color: ${(props) => (props.isActive ? "#5865f2" : "#ccc")};
  color: #fff;
  height: 38px;
  min-width: 96px;
  min-height: 38px;
  border: none;
  border-radius: 3px;
  font-size: 14px;
  font-weight: 500;
  line-height: 16px;
  padding: 2px 16px;
  cursor: ${(props) => (props.isActive ? "pointer" : "not-allowed")};

  &:hover {
    background-color: ${(props) => (props.isActive ? "#4752c4" : "#ccc")};
  }

  &:active {
    background-color: ${(props) => (props.isActive ? "#333b91" : "#ccc")};
  }
`;
