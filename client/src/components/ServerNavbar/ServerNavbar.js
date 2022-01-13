import React from "react";
// Styles
import { Container, Item, Separator, Icon } from "./ServerNavbar.styles";

const ServerNavbar = () => {
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
        <Item>
          <Icon>
            <img src="https://picsum.photos/48?random=2" alt="" />
          </Icon>
        </Item>
        <Item>
          <Icon>
            <img src="https://picsum.photos/48?random=3" alt="" />
          </Icon>
        </Item>
        <Item>
          <Icon>
            <img src="https://picsum.photos/48?random=4" alt="" />
          </Icon>
        </Item>
      </div>
    </Container>
  );
};

export default ServerNavbar;
