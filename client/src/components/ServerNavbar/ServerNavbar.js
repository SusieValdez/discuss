import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

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
// Utils
import Tooltip from "../../ui/Tooltip";

const ServerNavbar = ({ servers, onNewServer }) => {
  const { pathname } = useLocation();
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
          <Tooltip title="Home" arrow placement="right">
            <Item>
              <SvgIcon iconColor="#dcddde" hoverBackgroundColor="#5865F2">
                <Logo />
              </SvgIcon>
              <div className={`pill ${pathname === "/" && "active"}`} />
            </Item>
          </Tooltip>
        </Link>
      </div>
      <Separator />
      <div>
        {servers.map(({ _id, name, iconUrl, bannerColor }) => (
          <Link to={`/servers/${_id}`} key={_id}>
            <Tooltip title={name} arrow placement="right">
              <Item>
                <Icon>
                  <img
                    style={{ backgroundColor: bannerColor }}
                    src={iconUrl || "/default-user-logo.svg"}
                    alt=""
                  />
                </Icon>
                <div className={`pill ${pathname.includes(_id) && "active"}`} />
              </Item>
            </Tooltip>
          </Link>
        ))}
      </div>
      <Tooltip title="Add a server" arrow placement="right">
        <Item>
          <SvgIcon
            iconColor="#3ba55d"
            hoverBackgroundColor="#3ba55d"
            onClick={() => setNewServerModalOpen(true)}
          >
            <AddServerGreenIcon />
          </SvgIcon>
          <div className="pill" />
        </Item>
      </Tooltip>
      <Link to="/server-discovery">
        <Tooltip title="Explore servers" arrow placement="right">
          <Item>
            <SvgIcon iconColor="#3ba55d" hoverBackgroundColor="#3ba55d">
              <ExploreGreenIcon />
            </SvgIcon>
            <div
              className={`pill ${pathname === "/server-discovery" && "active"}`}
            />
          </Item>
        </Tooltip>
      </Link>
    </Container>
  );
};

export default ServerNavbar;
