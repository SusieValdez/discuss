import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  margin-bottom: 1rem;
  line-height: 1.375em;
  padding: 0.125rem 20px;

  :hover {
    background-color: rgba(4, 4, 5, 0.07);
  }

  input {
    padding: 10px;
    height: 40px;
    font-size: 16px;
    width: 100%;
    color: var(--font-light-gray);
    border-radius: 3px;
    background-color: #313339;
    border: var(--input-border);
    margin-bottom: 20px;
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
  background-color: ${(props) => props.backgroundColor};
`;

export const Username = styled.span`
  font-size: 1rem;
  font-weight: var(--font-weight-regular);
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
  color: var(--font-light-gray);
  font-size: 1rem;
  font-weight: var(--font-weight-regular);
  line-height: 1;

  a {
    color: #00aff4;
  }

  a:hover {
    text-decoration: underline;
  }

  img {
    width: 300px;
  }
`;
