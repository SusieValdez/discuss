import React, { useState } from "react";
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
import NewServerModal from "../NewServerModal";

const ServerNavbar = ({ servers, onNewServer }) => {
  const [newServerModalOpen, setNewServerModalOpen] = useState(false);
  return (
    <Container>
      <NewServerModal
        isOpen={newServerModalOpen}
        closeModal={() => setNewServerModalOpen(false)}
        onNewServer={onNewServer}
      />
      <div>
        <Link to="/">
          <Item>
            <SvgIcon iconColor="#dcddde" hoverBackgroundColor="#5865F2">
              <Logo />
            </SvgIcon>
          </Item>
        </Link>
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
        <SvgIcon
          iconColor="#3ba55d"
          hoverBackgroundColor="#3ba55d"
          onClick={() => setNewServerModalOpen(true)}
        >
          <AddServerGreenIcon />
        </SvgIcon>
      </Item>
      <Link to="/server-discovery">
        <Item>
          <SvgIcon iconColor="#3ba55d" hoverBackgroundColor="#3ba55d">
            <ExploreGreenIcon />
          </SvgIcon>
        </Item>
      </Link>
    </Container>
  );
};

export default ServerNavbar;
