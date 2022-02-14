import styled from "styled-components";

export const Title = styled.div`
  width: 210px;
  padding: 5px 0px 5px 25px;
  font-weight: 500;
  text-overflow: ellipsis;
  cursor: pointer;
  text-transform: lowercase;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  color: ${(props) => (props.isActive ? "#e1e2e3" : "#8e9297")};
  background-color: ${(props) => (props.isActive ? "#393c42" : "none")};
  border-radius: 3px;

  :hover {
    color: #e1e2e3;
    background-color: #393c42;
    border-radius: 3px;
  }

  img {
    width: 15px;
    height: 15px;
    margin-right: 5px;
  }
`;
