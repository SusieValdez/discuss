import React from "react";
import { Link } from "react-router-dom";
// Styles
import { Container, Item, Separator, Icon } from "./ServerNavbar.styles";
// Assets
import ExploreGreenIcon from "../../assets/compass-solid-green.svg";
import AddServerGreenIcon from "../../assets/plus-solid-green.svg";

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
        <Icon>
          <span>
            <img
              src={AddServerGreenIcon}
              style={{ width: "24px", height: "24px" }}
            />
          </span>
        </Icon>
      </Item>
      <Item>
        <Icon>
          <span>
            <img
              src={ExploreGreenIcon}
              style={{ width: "24px", height: "24px" }}
            />
          </span>
        </Icon>
      </Item>
    </Container>
  );
};

export default ServerNavbar;
