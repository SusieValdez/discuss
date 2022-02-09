import styled from "styled-components";

export const DeleteButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  width: 150px;
  height: 34px;
  transition: background-color 0.17s ease, color 0.17s ease;
  border: none;
  border-radius: 3px;
  font-size: 14px;
  font-weight: 500;
  line-height: 16px;
  padding: 2px 16px;
  cursor: pointer;

  &.active {
    background-color: #ed4245;

    :hover {
      background-color: #c03537;
    }

    :active {
      background-color: #cb373a;
    }
  }

  &.disabled {
    background-color: #b5868b;
    cursor: not-allowed;
  }
`;
