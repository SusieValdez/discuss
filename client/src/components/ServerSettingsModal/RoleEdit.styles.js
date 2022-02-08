import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  width: 700px;
  height: 100vh;
`;

export const RolesColumn = styled.div`
  width: 230px;
  height: 100%;
  border-right: 2px solid #3c3f45;
  padding: 65px 20px 10px 40px;
`;

export const SidebarSubmenu = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;

  .submenu-back-button {
    display: flex;

    h2 {
      margin-left: 8px;
      text-transform: uppercase;
      font-weight: 600;
      font-size: 16px;
      line-height: 20px;
      color: #b9bbbe;
    }
  }

  svg {
    width: 20px;
    height: 20px;
  }
`;

export const SidebarContent = styled.div`
  padding-right: 8px;
  margin-left: 10px;
`;

export const RoleSubsection = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 160px;
  height: 34px;
  margin-bottom: 2px;
  border-radius: 4px;
  padding: 6px 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: pointer;

  background-color: ${(props) => (props.isActive ? "#3e4248" : "none")};

  p {
    color: #fff;
    font-size: 14px;
    line-height: 18px;
  }

  :hover {
    background-color: #44494f;
  }
`;

export const RoleColor = styled.div`
  margin-right: 10px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${(props) => props.backgroundColor};
`;

export const Content = styled.div`
  padding-left: 20px;

  input[type="text"] {
    padding: 10px;
    height: 40px;
    font-size: 16px;
    width: 100%;
    color: #dcddde;
    border-radius: 3px;
    background-color: #313339;
    border: 1px solid #292b30;
    margin-bottom: 20px;
  }

  input[type="color"] {
    height: 50px;
    width: 66px;
    color: #dcddde;
    border-radius: 3px;
    background-color: #313339;
    border: 1px solid transparent;
    margin-bottom: 20px;
    &::-webkit-color-swatch-wrapper {
      padding: 0;
    }
    &::-webkit-color-swatch {
      border: none;
    }
  }

  h5 {
    color: #b9bbbe;
    margin-bottom: 8px;
    font-size: 12px;
    line-height: 16px;
    font-weight: 600;
    text-transform: uppercase;
  }

  p {
    font-size: 14px;
    line-height: 18px;
    color: #dcddde;
    margin-bottom: 8px;
  }
`;

export const Header = styled.div`
  padding: 60px 8px 16px;
  margin-bottom: 24px;

  h1 {
    text-transform: uppercase;
    font-weight: 600;
    font-size: 16px;
    line-height: 20px;
    color: #fff;
  }
`;

export const SubMenu = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 2px solid #3c3f45;
  margin-top: 16px;
  margin-bottom: 20px;
  cursor: pointer;

  p {
    font-size: 16px;
    line-height: 20px;
    color: #fff;
    margin-right: 32px;
  }
`;
