import styled from "styled-components";

export const Container = styled.div`
  background: url(${(props) => props.background}) no-repeat center center fixed;
  display: flex;
  width: 100%;
  height: 100vh;
  overflow: hidden;
`;
