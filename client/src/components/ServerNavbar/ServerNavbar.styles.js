import styled from "styled-components";

export const Container = styled.div`
  width: 72px;
  height: 100%;
  min-width: 85px;
  overflow-y: auto;
  overflow-x: hidden;
`;

export const Item = styled.div`
  width: 72px;
  height: 48px;
  margin: 0 0 6px;
  cursor: pointer;
  transition: all 0.15s ease-out;

  .pill {
    position: relative;
    left: -8px;
    top: -45px;
    width: 8px;
    height: 20px;
    background-color: var(--font-color-white);
    border-radius: 4px;
  }

  :hover {
    .pill {
      left: -4px;
    }
  }

  .pill.active {
    left: -4px;
    height: 40px;
    top: -55px;
    transition: all 500ms;
  }
`;

export const Separator = styled.div`
  margin: 10px auto;
  height: 2px;
  width: 32px;
  border-radius: 1px;
  background-color: #2d2f32;
`;

export const SvgIcon = styled.div`
  display: flex;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  margin: 10px auto;
  background-color: #36393f;
  transition: all 0.15s ease-out;
  align-items: center;
  justify-content: center;
  color: ${(props) => props.iconColor};

  :hover {
    border-radius: 18px;
    color: var(--font-color-white);
    background-color: ${(props) => props.hoverBackgroundColor};
  }

  svg {
    display: flex;
    justify-content: center;
    align-items: center;
    max-width: 24px;
    max-height: 24px;
    border-radius: 50%;
    transition: all 0.15s ease-out;

    :hover {
      border-radius: 18px;
    }
  }
`;

export const Icon = styled.div`
  display: flex;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  margin: 10px auto;
  background-color: #36393f;
  transition: all 0.15s ease-out;
  align-items: center;
  justify-content: center;
  color: #8e9297;

  :hover {
    border-radius: 18px;
    color: var(--font-color-white);
  }

  span {
    font-size: 32px;
  }

  img {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    transition: all 0.15s ease-out;

    :hover {
      border-radius: 18px;
    }
  }
`;
