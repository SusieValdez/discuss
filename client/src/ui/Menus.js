import { ControlledMenu } from "@szhsin/react-menu";
import { menuItemSelector, menuSelector } from "@szhsin/react-menu/style-utils";
import styled from "styled-components";

export const Menu = styled(ControlledMenu)`
  ${menuSelector.name} {
    background-color: #18191c;
    box-shadow: (0, 0, 0, 0.24);
    border-radius: 4px;
    max-height: calc(100vh - 32px);
    flex-direction: column;
    min-width: 188px;
    max-width: 320px;
  }

  ${menuItemSelector.name} {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    color: #b9bbbe;
    min-height: 32px;
    padding: 6px 8px;
    align-items: center;
    margin: 2px 0;
    font-size: 13px;
    line-height: 18px;

    img {
      display: flex;
      width: 18px;
      height: 18px;
    }

    svg {
      display: flex;
      width: 18px;
      height: 18px;
    }
  }

  ${menuItemSelector.hover} {
    color: #fff;
    background-color: #59a2ff;
  }
`;
