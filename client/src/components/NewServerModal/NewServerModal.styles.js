import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  justify-content: center;
  background-color: var(--font-white);
  border-radius: 5px 5px 0 0;
  width: 100%;
  height: 100%;

  svg {
    width: 24px;
    height: 24px;
    color: var(--font-darker-gray);
    cursor: pointer;
    position: absolute;
    top: 20px;
    right: 20px;
  }
`;

export const Content = styled.div`
  padding: 10px 24px 30px 24px;
  text-align: center;
  margin: 16px;

  h2 {
    color: #060607;
    font-size: 24px;
    line-height: 30px;
  }

  h5 {
    text-align: left;
    text-transform: uppercase;
    color: #4f5660;
    font-size: 12px;
    line-height: 16px;
    margin-bottom: 8px;
    margin-top: 24px;
  }

  strong {
    font-weight: var(--font-weight-title);
  }

  input {
    padding: 10px;
    height: 40px;
    font-size: 16px;
    width: 100%;
    color: #4d5155;
    border-radius: 3px;
    background-color: #fbfbfc;
    border: 1px solid var(--font-darker-gray);
    margin-bottom: 10px;
  }

  p {
    color: #575d67;
    font-size: 14px;
    line-height: 20px;
    font-weight: var(--font-weight-regular);
    margin-top: 8px;
    padding-bottom: 20px;
  }
`;

export const Guidelines = styled.div`
  margin-top: 3px;
  padding-bottom: 48px;
  font-size: 12px;
  line-height: 16px;
  color: #747f8d;
  font-weight: 200;
  text-align: left;
`;

export const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  width: 100%;
  height: 70px;
  background-color: #f6f6f7;
`;

export const BackButton = styled.button`
  padding: 2px 4px;
  background-color: transparent;
  height: auto;
  color: #181819;
  border: none;
  cursor: pointer;
  font-size: 14px;
  font-weight: var(--font-weight-regular);
  line-height: 16px;
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
  font-weight: var(--font-weight-title);
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
