import styled from "styled-components";

export const Container = styled.div`
  width: 72px;
  height: 100%;
  min-width: 72px;
  margin: auto;
`;

export const Item = styled.div`
  width: 72px;
  height: 48px;
  margin: 0 0 6px;
  cursor: pointer;
`;

export const Separator = styled.div`
  margin: 10px auto;
  height: 2px;
  width: 32px;
  border-radius: 1px;
  background-color: #2d2f32;
`;

export const Icon = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  margin: 10px auto;
  background-color: #36393f;

  img {
    max-width: 48px;
    max-height: 48px;
    border-radius: 50%;
    transition: all 0.15s ease-out;

    :hover {
      border-radius: 18px;
    }
  }
`;
