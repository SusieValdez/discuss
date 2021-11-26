import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  margin-top: 1rem;
  padding-left: 2rem;
`;

export const Col = styled.div`
  flex-direction: column;
  align-items: stretch;
  width: 40px;
  min-height: 2.75rem;
  padding-right: 1rem;
  position: relative;
`;

export const Avatar = styled.img`
  left: 16px;
  margin-top: calc(4px - 0.125rem);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
  flex: 0 0 auto;
  pointer-events: none;
`;

export const Header = styled.div``;

export const Username = styled.span`
   {
    font-size: 1rem;
    font-weight: 500;
    line-height: 1.375rem;
    display: inline;
    vertical-align: baseline;
    margin-right: 0.25rem;
    position: relative;
    overflow: hidden;
  }

  :hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;

export const Timestamp = styled.span`
  font-size: 0.75rem;
  line-height: 1.375rem;
  margin-left: 0.25rem;
  color: #72767d;
`;

export const Content = styled.div`
  color: #dcddde;
  font-size: 1rem;
  line-height: 1.375rem;
  white-space: break-spaces;
  font-weight: 400;
`;
