import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: var(--border-radius);
  width: 100%;
  height: 100%;
  box-shadow: var(--box-shadow);
`;

export const Header = styled.div`
  padding: 16px;
  color: var(--font-white);
  line-height: 30px;

  h3 {
    font-size: 20px;
    text-align: left;
  }
`;

export const Content = styled.div`
  padding: 0 16px 20px;

  p {
    color: var(--font-darker-gray);
    font-size: 14px;
    line-height: 20px;
    font-weight: var(--font-weight-regular);
    margin-bottom: 10px;
  }
`;

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
    border-radius: var(--border-radius);
    background: none;
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  }

  .delete-button {
    width: auto;
    height: 38px;
    background-color: var(--red);
    color: var(--font-white);
    transition: background-color 0.17s ease, color 0.17s ease;
    border: none;
    border-radius: var(--border-radius);
    font-size: 14px;
    font-weight: var(--font-weight-regular);
    line-height: 16px;
    padding: 2px 16px;
    cursor: pointer;

    &:hover {
      background-color: var(--medium-red);
    }

    &:active {
      background-color: var(--dark-red);
    }
  }
`;
