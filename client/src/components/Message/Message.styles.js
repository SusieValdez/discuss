import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  margin-bottom: 1rem;
  line-height: 1.375rem;
  padding: 0.125rem 20px;

  :hover {
    background-color: rgba(4, 4, 5, 0.07);
  }
`;

export const Avatar = styled.img`
  left: 16px;
  margin-top: 4px;
  margin-right: 10px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
`;

export const Username = styled.span`
  font-size: 1rem;
  font-weight: 500;
  margin-right: 0.25rem;

  :hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;

export const Timestamp = styled.span`
  font-size: 0.75rem;
  margin-left: 0.25rem;
  color: #72767d;
`;

export const Content = styled.div`
  color: #dcddde;
  font-size: 1rem;
  font-weight: 400;
`;
