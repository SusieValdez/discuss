import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 70%;
  margin-bottom: 50px;
  overflow-y: scroll;
`;

export const Permission = styled.div`
  display: flex;
  flex-direction: column;
  padding-right: 10px;

  > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }

  h4 {
    color: #fff;
    margin-top: 10px;
    line-height: 24px;
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;
  }

  p {
    color: #b9bbbe;
    font-size: 14px;
    line-height: 20px;
    font-weight: 400;
    margin-top: 10px;
  }

  .line-break {
    border-top: 2px solid #3a3d43;
    margin-top: 20px;
  }
`;
