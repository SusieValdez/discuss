import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: var(--box-shadow);
  background-color: var(--bg-chat-area);
  border-radius: var(--border-radius);
  border-width: 0;
  width: 100%;
  height: 100%;
  padding-top: 18px;
`;

export const Header = styled.div`
  text-align: center;
  padding: 16px;
  color: var(--font-white);
  font-size: 24px;
  line-height: 30px;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  padding: 0 16px 0 16px;

  h5 {
    text-transform: uppercase;
    color: var(--font-light-gray);
    font-size: 12px;
    line-height: 16px;
    margin-bottom: 8px;
  }

  input {
    padding: 10px;
    height: 40px;
    font-size: 16px;
    width: 100%;
    color: var(--font-light-gray);
    border-radius: 3px;
    background-color: #313339;
    border: var(--input-border);
    margin-bottom: 20px;
  }

  p {
    color: var(--font-darker-gray);
    font-size: 14px;
    line-height: 20px;
    font-weight: var(--font-weight-regular);
    margin-bottom: 10px;
  }
`;

// export const PrivateCategory = styled.div`
//   display: flex;
//   justify-content: space-between;
// `;

export const Footer = styled.div`
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

  .create-category-button {
    width: auto;
    height: 38px;
    transition: background-color 0.17s ease, color 0.17s ease;
    border: none;
    border-radius: 3px;
    font-size: 14px;
    font-weight: var(--font-weight-regular);
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
