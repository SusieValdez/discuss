import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  width: 100%;
  padding: 20px;

  > div {
    display: flex;
  }

  h1 {
    align-self: flex-start;
    margin: 30px 0 20px 70px;
    color: #fff;
    text-align: left;
    font-weight: 600;
    font-size: 20px;
    line-height: 24px;
  }
`;

export const CardContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin: 0 0 20px 70px;
  overflow-y: scroll;
`;

export const DiscoveryHeroImage = styled.div`
  background: url(${(props) => props.background});
  width: 90%;
  min-height: 200px;
  border-radius: 8px;

  input {
    height: 30px;
    align-self: center;
    margin: auto auto;
    width: 60%;
    padding: 10px;
  }
`;

export const ServerCard = styled.div`
  background-color: #292b2f;
  width: 300px;
  height: 320px;
  margin: 10px;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background-color: #202225;
    transform: translateY(-1px);
    box-shadow: 0 0 0 0.24;
  }

  img {
    width: 100px;
    border-radius: 50%;
  }

  h4 {
    font-size: 16px;
    line-height: 20px;
    color: #fff;
    font-weight: 600;
    padding: 0 16px 16px;
    margin-top: -20px;
  }

  p {
    font-size: 14px;
    line-height: 18px;
    color: #b9bbbe;
    margin: 4px 15px 40px 15px;
  }

  .server-banner-color {
    height: 143px;
    border-radius: 8px 8px 0 0;
  }
`;

export const ImageHolder = styled.div`
  img {
    position: relative;
    width: 52px;
    height: 52px;
    top: -30px;
    left: 20px;
    border: 4px solid #292b2f;
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

export const Members = styled.div`
  display: flex;
  justify-content: space-around;

  div {
    display: flex;
    align-items: center;

    font-size: 0.75rem;
    line-height: 1rem;
    color: #b9bbbe;
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
