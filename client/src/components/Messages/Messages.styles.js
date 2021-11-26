import styled from "styled-components";

export const Container = styled.div`
  min-width: 0;
  min-height: 0;
  -webkit-box-flex: 1;
  flex: 1 1 auto;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: row;
  justify-content: stretch;
  position: relative;
  overflow: hidden;
`;

export const Content = styled.div`
  display: flex;
  flex: 1 1 auto;
  -webkit-box-flex: 1;
  flex-direction: column;
  overflow-y: scroll;
`;
