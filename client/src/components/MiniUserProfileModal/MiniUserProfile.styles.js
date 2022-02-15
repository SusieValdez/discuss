import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  box-shadow: "0, 0, 0, 0.24";
  padding: 20;
  background-color: var(--bg-color-dark-gray);
  border-radius: var(--border-radius);
  border-width: 0;

  hr {
    color: #262729;
    margin: 0 auto 12px auto;
    height: 1px;
    width: 95%;
  }
`;

export const Banner = styled.div`
  height: 60px;

  img {
    position: absolute;
    border-radius: 50%;
    width: 80px;
    height: 80px;
    border: 6px solid var(--bg-color-dark-gray);
    top: 30px;
    left: 16px;
  }
`;

export const OnlineStatusIndicatorIcon = styled.div`
  width: 25px;
  height: 25px;
  border-radius: 50%;
  position: relative;
  top: 28px;
  left: 70px;
  border: 5px solid var(--bg-color-dark-gray);

  &.online {
    background-color: #3ba55d;
  }

  &.offline {
    width: 20px;
    height: 20px;
    background-color: #18191c;
    border: 4px solid var(--font-darker-gray);
  }

  &.idle {
    background-color: #faa81a;
  }

  &.do-not-disturb {
    background-color: #ed4245;
  }
`;

export const Header = styled.div`
  padding: 35px 16px 16px 16px;

  h2 {
    color: var(--font-white);
  }

  p {
    font-size: 12px;
    line-height: 18px;
    font-weight: var(--font-weight-regular);
    color: var(--font-darker-gray);
  }
`;

export const Content = styled.div`
  padding: 0 16px 16px 14px;

  h3 {
    text-transform: uppercase;
    color: var(--font-darker-gray);
    margin-top: 4px;
    margin-bottom: 15px;
    font-size: 12px;
    line-height: 16px;
  }
`;

export const RoleContainer = styled.div`
  display: flex;
  margin-bottom: 16px;
  margin-top: 8px;
  flex-wrap: wrap;
`;

export const RoleDiv = styled.div`
  display: flex;
  background-color: #292b2f;
  border-radius: 4px;
  height: 22px;
  max-width: 200px;
  text-overflow: ellipsis;
  margin: 0 4px 4px 0;
  padding: 4px;
  align-items: center;
  color: #d6d7d7;
  font-size: 12px;
`;

export const AboutMe = styled.div`
  color: #bbbcbd;
  max-height: 100px;
  width: 270px;
  overflow-y: auto;
  margin-bottom: 13px;
  font-size: 12px;
  line-height: 18px;
  word-wrap: break-word;
`;

export const RoleDot = styled.div`
  width: 12px;
  height: 12px;
  margin-right: 8px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

export const Footer = styled.div`
  padding: 0 16px 16px;
  margin-top: -2px;

  input {
    font-size: 14px;
    background-color: var(--user-menu-dark-gray);
    padding: 10px;
    height: 40px;
    width: 100%;
    border-radius: 3px;
    color: var(--font-light-gray);
    border: var(--input-border);
    transition: border-color 0.2s ease-in-out;

    :hover {
      border-color: #040405;
    }

    :focus {
      border: 1px solid #00aff4;
    }
  }
`;
