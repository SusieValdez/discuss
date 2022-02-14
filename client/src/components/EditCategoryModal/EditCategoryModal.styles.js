import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;

  svg {
    width: 36px;
    height: 36px;
    color: var(--font-light-gray);
    cursor: pointer;
  }
`;

export const IconContainer = styled.div`
  padding-top: 50px;
`;

export const OptionSidebar = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  min-width: 226px;
  background-color: var(--bg-color-gray);
`;

export const OptionSidebarContainer = styled.div`
  width: 218px;
  padding: 60px 12px 60px 50px;
  width: 100%;

  p {
    background-color: transparent;
    color: var(--font-light-gray);
    font-size: 16px;
    line-height: 20px;
    padding: 6px;
    margin-bottom: 2px;
    border-radius: 4px;
    font-weight: var(--font-weight-regular);
    cursor: pointer;

    &:hover {
      color: var(--font-light-gray);
      background-color: var(--bg-color-gray);
    }

    &:active {
      color: #e8e9e9
      background-color: #41454c;
    }
  }
`;

export const OptionSidebarHeader = styled.div`
  text-align: left;
  h3 {
    font-size: 12px;
    font-weight: var(--font-weight-title);
    line-height: 16px;
    text-transform: uppercase;
    color: #8e9297;
    padding: 6px 2px;
  }
`;

export const Divider = styled.div`
  margin: 8px 10px;
  height: 1px;
  background-color: #3b3d42;
  width: 90%;
`;

export const DeleteButton = styled.div`
  p {
  color: var(--red);
  font-size: 16px;
  line-height: 20px;
  padding: 6px;
  margin-bottom: 2px;
  border-radius: 4px;
  font-weight: var(--font-weight-regular);
  cursor: pointer;

  &:hover {
    color: var(--red);
    background-color: #33363c;
    }

    &:active {
      color: var(--font-white)
      background-color: var(--dark-red);
    }}
`;

export const Content = styled.div`
  padding: 60px 40px 80px;
  max-width: 740px;
  width: 740px;
  min-width: 460px;
  min-height: 100%;

  h2 {
    text-transform: uppercase;
    color: var(--font-white);
    font-size: 16px;
    line-height: 20px;
    margin-bottom: 20px;
  }

  h5 {
    text-transform: uppercase;
    color: var(--font-darker-gray);
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
    border: var(--inputborder)
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

export const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
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

  .create-button {
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
      color: var(--font-white);
      background-color: var(--blue);
      cursor: pointer;

      &:hover {
        background-color: var(--medium-blue);
      }

      &:active {
        background-color: var(--dark-blue);
      }
    }

    &.disabled {
      color: #91939a;
      background-color: #434b94;
      cursor: not-allowed;
    }
  }
`;
