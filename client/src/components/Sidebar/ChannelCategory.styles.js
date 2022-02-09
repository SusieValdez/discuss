import styled from "styled-components";

export const Category = styled.div`
  color: #8e9297;
  padding: 10px;

  .category-header {
    display: flex;
    justify-content: space-between;
    text-transform: uppercase;
    cursor: pointer;
    font-size: 14px;
    padding: 5px;

    .category-title {
      width: 100%;
      :hover {
        color: #e1e2e3;
      }
    }

    .svg-container {
      width: 15px;
      height: 15px;
    }

    svg {
      width: 12px;
      height: 12px;
      :hover {
        color: #e1e2e3;
      }
    }
  }

  img {
    width: 12px;
    height: 12px;
    margin-right: 10px;
  }
`;
