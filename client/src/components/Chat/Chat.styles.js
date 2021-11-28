import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  background-color: #36393f;
  flex-direction: column;
`;

export const Title = styled.div`
  background-color: #36393f;
  width: 100%;
  height: 48px;
  padding: 16px;
  box-shadow: 0 1px 0 rgba(4, 4, 5, 0.2), 0 1.5px 0 rgba(6, 6, 7, 0.05),
    0 2px 0 rgba(4, 4, 5, 0.05);
  color: #fff;
  display: flex;
  align-items: center;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
`;
