import styled from "styled-components";

export const Container = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: url(${(props) => props.background});
  justify-content: center;
  align-items: center;
`;

export const Card = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  right: auto;
  bottom: auto;
  margin-right: -50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  text-align: center;
  background-color: #36393f;
  color: #72767d;
  height: 50%;
  width: 95%;
  padding: 40px;
  border-radius: 5px;
  box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.2);

  h3 {
    font-size: 24px;
    font-weight: 600;
    color: #fff;
  }

  p {
    margin-top: 20px;
    line-height: 20px;
    color: #ed4245;
  }
`;

export const ConfirmButton = styled.button`
  width: 300px;
  height: 44px;
  border: none;
  border-radius: 3px;
  font-size: 14px;
  font-weight: 500;
  line-height: 16px;
  padding: 2px 16px;
  background-color: #5865f2;
  color: #fafbfe;
  cursor: pointer;
  margin: 10px;

  &:active {
    background-color: #4752c4;
  }
`;

export const CancelButton = styled.div`
  height: 38px;
  width: 300px;
  color: #fff;
  font-size: 14px;
  font-weight: 500;
  line-height: 16px;
  padding: 2px 16px;
  margin: 10px;
  border: none;
  border-radius: 3px;
  background: none;
  cursor: pointer;

  &:active {
    text-decoration: underline;
  }
`;
