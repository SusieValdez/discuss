import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  background-color: var(--bg-chat-area);
  flex-direction: column;
`;

export const Title = styled.div`
  background-color: #36393f;
  width: 100%;
  height: 48px;
  padding: 16px;
  box-shadow: var(--box-shadow);
  margin-bottom: 1px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  h3 {
    width: 300px;
    color: var(--font-white);
    font-weight: var(--font-weight-title);
    font-size: 14px;
    line-height: 20px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  svg {
    width: 24px;
    height: 24px;
    cursor: pointer;
    margin: 0 8px;
    color: var(--font-darker-gray);
  }

  a {
    text-decoration: none;
    color: var(--font-white);
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: row;
  overflow-y: hidden;
  height: 100vh;
`;

export const ChatArea = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: hidden;
  width: 100%;

  .typing-indicator {
    font-size: 14px;
    font-weight: var(--font-weight-regular);
    color: var(--font-light-gray);
    padding: 20px;
  }
`;

export const Divider = styled.div`
  padding-top: -5px;
  width: 90%;
  margin: 10px auto;
  border-top: thin solid #42454a;

  span {
    text-align: center;
    display: block;
    width: 200px;
    margin: -8px auto 0 auto;
    background-color: #36393f;
    color: #72767d;
    font-size: 12px;
    font-weight: var(--font-weight-regular);
  }
`;
