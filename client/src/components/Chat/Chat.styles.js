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
  box-sizing: border-box;
  display: flex;
  width: 100%;
  height: 48px;
  padding: 0 16px;
  align-self: flex-start;
  position: relative;
  box-shadow: 0 1px 0 rgba(4, 4, 5, 0.2), 0 1.5px 0 rgba(6, 6, 7, 0.05),
    0 2px 0 rgba(4, 4, 5, 0.05);
`;

export const Children = styled.div`
  height: 48px;
  position: relative;
  -webkit-box-flex: 1;
  -ms-flex: 1 1 auto;
  flex: 1 1 auto;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  min-width: 0;
  overflow: hidden;
  box-sizing: border-box;
  color: #fff;

  h3 {
    -webkit-box-pack: start;
    -ms-flex-pack: start;
    justify-content: flex-start;
    margin: 0 8px 0 0;
    -ms-flex: 0 0 auto;
    flex: 0 0 auto;
    min-width: auto;
    overflow: hidden;
    white-space: nowrap;
    font-weight: 600;
    font-size: 16px;
    line-height: 20px;
  }
`;
