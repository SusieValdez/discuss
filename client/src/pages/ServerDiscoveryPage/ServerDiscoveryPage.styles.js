import styled from "styled-components";

export const Container = styled.div`
  height: 100vh;
  width: 100%;

  > div {
    display: flex;
  }
`;

export const ServerCard = styled.div`
  background-color: green;
  width: 200px;
  height: 150px;
  margin: 10px;
  border-radius: 5px;
  padding: 10px;
  border: solid transparent 3px;
  cursor: pointer;

  img {
    width: 100px;
    border-radius: 50%;
  }

  :hover {
    border: solid white 3px;
  }
`;

export const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: "0, 0, 0, 0.24";
  background-color: #36393f;
  border-radius: 8px;
  width: 100%;
  height: 100%;
  border-radius: "6px";
  box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.2);
`;

export const ModalHeader = styled.div`
  padding: 16px;
  color: #fff;
  line-height: 30px;

  h3 {
    font-size: 20px;
    text-align: left;
  }
`;

export const ModalContent = styled.div`
  padding: 0 16px 20px;

  p {
    color: #b9bbbe;
    font-size: 14px;
    line-height: 20px;
    font-weight: 400;
    margin-bottom: 10px;
  }
`;

export const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  background-color: #2f3136;
  height: 70px;
  padding: 16px;

  .cancel-button {
    width: auto;
    height: 38px;
    color: #fff;
    min-width: 96px;
    min-height: 38px;
    font-size: 14px;
    font-weight: 500;
    line-height: 16px;
    padding: 2px 16px;
    border: none;
    border-radius: 3px;
    background: none;
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  }

  .join-button {
    width: auto;
    height: 38px;
    transition: background-color 0.17s ease, color 0.17s ease;
    border: none;
    border-radius: 3px;
    font-size: 14px;
    font-weight: 500;
    line-height: 16px;
    padding: 2px 16px;

    &.active {
      color: #fff;
      background-color: #42ed56;
      cursor: pointer;

      &:hover {
        background-color: #3cc035;
      }

      &:active {
        background-color: #2d9f31;
      }
    }

    &.disabled {
      color: #91939a;
      background-color: #608075;
      cursor: not-allowed;
    }
  }
`;
