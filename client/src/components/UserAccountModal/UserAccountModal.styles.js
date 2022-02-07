import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  background-color: #36393f;
  width: 100%;
  height: 100%;

  svg {
    width: 36px;
    height: 36px;
    color: #dcddde;
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
  background-color: #2f3136;
`;

export const OptionSidebarContainer = styled.div`
  width: 218px;
  padding: 60px 12px 60px 50px;
  width: 100%;

  p {
    background-color: transparent;
    color: #b0b2b3;
    font-size: 16px;
    line-height: 20px;
    padding: 6px;
    margin-bottom: 2px;
    border-radius: 4px;
    font-weight: 500;
    cursor: pointer;

    &:hover {
      color: #dcddde;
      background-color: #33363c;
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
    font-weight: 700;
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

export const RedButton = styled.div`
  p {
  color: #de4043;
  font-size: 16px;
  line-height: 20px;
  padding: 6px;
  margin-bottom: 2px;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;

  &:hover {
    color: #de4043;
    background-color: #33363c;
    }

    &:active {
      color: #e8e9e9
      background-color: #de4043;
    }}
`;
