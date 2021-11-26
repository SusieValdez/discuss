import styled from "styled-components";

export const Container = styled.div`
  flex-direction: column;
  width: 240px;
  flex: 0 0 auto;
  background-color: #2f3136;
`;

export const Header = styled.div`
  position: relative;
  font-weight: 500;
  padding: 0 16px;
  height: 48px;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  transition: background-color 0.1s linear;
  color: #fff;
  -webkit-box-shadow: var(--elevation-low);
  box-shadow: 0 1px 0 rgba(4, 4, 5, 0.2) 0 1.5px 0 rgba(6, 6, 7, 0.05) 0 2px 0
    rgba(4, 4, 5, 0.05);
`;
