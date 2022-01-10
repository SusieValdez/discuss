import styled from "styled-components";

export const Category = styled.div`
  font-size: 16px;
  text-transform: uppercase;
  padding: 10px;
  color: #8e9297;
  cursor: pointer;

  .category-header {
    padding: 5px;

    :hover {
      color: #e1e2e3;
    }
  }

  img {
    width: 12px;
    height: 12px;
    margin-right: 10px;
  }
`;
