import React from "react";
import { Link } from "react-router-dom";
// Styles
import { Container, Item, Separator, Icon } from "./ServerNavbar.styles";

const ServerNavbar = ({ servers }) => {
  return (
    <Container>
      <div>
        <Item>
          <Icon>
            <span>H</span>
          </Icon>
        </Item>
      </div>
      <Separator />
      <div>
        {servers.map(({ id, iconUrl }) => (
          <Link to={`/servers/${id}`} key={id}>
            <Item>
              <Icon>
                <img src={iconUrl} alt="" />
              </Icon>
            </Item>
          </Link>
        ))}
      </div>
    </Container>
  );
};

export default ServerNavbar;
