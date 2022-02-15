import styled from "styled-components";

export const Container = styled.div`
  height: 100vh;
  width: 100%;
  padding: 20px;
  background-color: var(--bg-chat-area);

  > div {
    display: flex;
  }

  h1 {
    align-self: flex-start;
    margin: 30px 0 20px 70px;
    color: var(--font-white);
    text-align: left;
    font-weight: var(--font-weight-title);
    font-size: 20px;
    line-height: 24px;
  }
`;

export const PageContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const CardContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  width: 100%;
  flex-wrap: wrap;
  overflow-y: scroll;
  overflow-x: hidden;
  margin-bottom: 30px;
`;

export const DiscoveryHeroImage = styled.div`
  display: flex;
  background: url(${(props) => props.background});
  width: 100%;
  min-height: 200px;
  border-radius: var(--border-radius);

  input {
    height: 40px;
    align-self: center;
    margin: auto auto;
    width: 60%;
    padding: 10px;
  }
`;

export const ServerCard = styled.div`
  background-color: var(--user-menu-dark-gray);
  width: 300px;
  height: 320px;
  margin: 10px;
  border-radius: var(--border-radius);

  cursor: pointer;

  &:hover {
    background-color: #202225;
    transform: translateY(-1px);
    box-shadow: 0 0 0 0.24;
  }
`;

export const CardHeader = styled.div`
  border: none;
  height: 143px;
  display: flex;

  img {
    width: 100%;
    border-radius: 8px 8px 0 0;
    vertical-align: middle;
    object-fit: cover;
  }
`;

export const CardContent = styled.div`
  height: 20%;

  h4 {
    font-size: 16px;
    line-height: 20px;
    color: var(--font-white);
    font-weight: 600;
    padding: 0 16px 16px;
    margin-top: -20px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }

  p {
    font-size: 14px;
    line-height: 18px;
    color: var(--font-darker-gray);
    margin: 4px 15px 40px 15px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
`;

export const CardFooter = styled.div`
  display: flex;
  justify-content: space-around;
  height: 20%;

  div {
    display: flex;
    align-items: center;

    font-size: 0.75rem;
    line-height: 1rem;
    color: var(--font-darker-gray);
  }

  .online {
    width: 10px;
    height: 10px;
    margin-right: 8px;
    border-radius: 50%;
    background-color: var(--online);
  }

  .offline {
    width: 10px;
    height: 10px;
    margin-right: 8px;
    border-radius: 50%;
    background-color: #b9bbbe;
  }
`;

export const ImageHolder = styled.div`
  img {
    width: 100px;
    border-radius: 50%;
    position: relative;
    width: 70px;
    height: 70px;
    top: -30px;
    left: 20px;
    border: 4px solid var(--user-menu-dark-gray);
  }
`;

export const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: var(--box-shadow);
  background-color: var(--bg-chat-area);
  border-radius: var(--border-radius);
  width: 100%;
  height: 100%;
  box-shadow: var(--box-shadow);
`;

export const ModalHeader = styled.div`
  padding: 16px;
  color: var(--font-white);
  line-height: 30px;

  h3 {
    font-size: 20px;
    text-align: left;
  }
`;

export const ModalContent = styled.div`
  padding: 0 16px 20px;

  p {
    color: var(--font-darker-gray);
    font-size: 14px;
    line-height: 20px;
    font-weight: var(--font-weight-regular);
    margin-bottom: 10px;
  }
`;

export const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  background-color: var(--bg-color-gray);
  height: 70px;
  padding: 16px;

  .cancel-button {
    width: auto;
    height: 38px;
    color: var(--font-white);
    min-width: 96px;
    min-height: 38px;
    font-size: 14px;
    font-weight: var(--font-weight-regular);
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
    font-weight: var(--font-weight-ttile);
    line-height: 16px;
    padding: 2px 16px;

    &.active {
      color: #fff;
      background-color: var(--blue);
      cursor: pointer;

      &:hover {
        background-color: var(--medium-blue);
      }

      &:active {
        background-color: #3e49c2;
      }
    }

    &.disabled {
      color: #91939a;
      background-color: #434b94;
      cursor: not-allowed;
    }
  }
`;
