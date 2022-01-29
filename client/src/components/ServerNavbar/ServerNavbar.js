import React from "react";
import { Link } from "react-router-dom";
// Styles
import {
  Container,
  Item,
  Separator,
  Icon,
  SvgIcon,
} from "./ServerNavbar.styles";
// Assets
import { ReactComponent as ExploreGreenIcon } from "../../assets/compass-solid-green.svg";
import { ReactComponent as AddServerGreenIcon } from "../../assets/plus-solid-green.svg";
import { ReactComponent as Logo } from "../../assets/logo.svg";

const ServerNavbar = ({ servers }) => {
  return (
    <Container>
      <div>
        <Item>
          <SvgIcon iconColor="#dcddde" hoverBackgroundColor="#5865F2">
            <Logo />
          </SvgIcon>
        </Item>
      </div>
      <Separator />
      <div>
        {servers.map(({ _id, iconUrl }) => (
          <Link to={`/servers/${_id}`} key={_id}>
            <Item>
              <Icon>
                <img src={iconUrl} alt="" />
              </Icon>
            </Item>
          </Link>
        ))}
      </div>
      <Item>
        <SvgIcon iconColor="#3ba55d" hoverBackgroundColor="#3ba55d">
          <AddServerGreenIcon />
        </SvgIcon>
      </Item>
      <Item>
        <SvgIcon iconColor="#3ba55d" hoverBackgroundColor="#3ba55d">
          <ExploreGreenIcon />
        </SvgIcon>
      </Item>
    </Container>
  );
};

export default ServerNavbar;
