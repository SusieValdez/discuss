import { React, useRef, useState } from "react";
//Components
import ChannelCategory from "./ChannelCategory";
// Styles
import {
  Container,
  Header,
  UserPanel,
  IconContainer,
  UserTag,
} from "./Sidebar.styles";
// Assets
import gearIcon from "../../assets/cog-solid.svg";
import { Menu } from "../../ui/Menus";
import { MenuItem, useMenuState } from "@szhsin/react-menu";

const Sidebar = ({
  serverName,
  categories,
  channels,
  activeChannel,
  localUser,
  onClickLogout,
}) => {
  const [headerMenuIsOpen, setHeaderMenuIsOpen] = useState(false);
  const headerMenu = useMenuState();
  const headerRef = useRef(null);

  const [statusMenuIsOpen, setStatusMenuIsOpen] = useState(false);
  const statusMenu = useMenuState();
  const statusRef = useRef(null);

  const onClickHeader = () => {
    setHeaderMenuIsOpen(!headerMenuIsOpen);
    headerMenu.toggleMenu(!headerMenuIsOpen);
  };

  const onClickStatusProfilePic = () => {
    setStatusMenuIsOpen(!statusMenuIsOpen);
    statusMenu.toggleMenu(!statusMenuIsOpen);
  };

  const channelsByCategory = {};
  for (const category of categories) {
    channelsByCategory[category._id] = {
      category,
      channels: [],
    };
  }
  for (const channel of channels) {
    channelsByCategory[channel.categoryId].channels.push(channel);
  }

  return (
    <Container>
      <div>
        <Header onClick={onClickHeader} ref={headerRef}>
          {serverName}
        </Header>
        <Menu
          state={headerMenu.state}
          endTransition={headerMenu.endTransition}
          anchorRef={headerRef}
          onClose={() => headerMenu.toggleMenu(false)}
          offsetY={10}
          offsetX={10}
        >
          <MenuItem>Server Settings</MenuItem>
        </Menu>
        {Object.values(channelsByCategory).map(({ category, channels }) => (
          <ChannelCategory
            key={category._id}
            name={category.name}
            channels={channels}
            activeChannel={activeChannel}
          />
        ))}
      </div>
      <UserPanel>
        <UserTag>
          <img
            style={{ backgroundColor: localUser.bannerColor }}
            src={localUser.avatarUrl}
            alt="profile pic"
            ref={statusRef}
            onClick={onClickStatusProfilePic}
          />
          <Menu
            state={statusMenu.state}
            endTransition={statusMenu.endTransition}
            anchorRef={statusRef}
            onClose={() => statusMenu.toggleMenu(false)}
            offsetY={15}
          >
            <MenuItem>Online</MenuItem>
            <MenuItem>Idle</MenuItem>
            <MenuItem>Do Not Disturb</MenuItem>
            <MenuItem>Invisible</MenuItem>
          </Menu>
          <div>
            <h3>{localUser.name}</h3>
            <p>{localUser.legend}</p>
          </div>
        </UserTag>
        <IconContainer>
          <img src={gearIcon} onClick={onClickLogout} alt="settings" />
        </IconContainer>
      </UserPanel>
    </Container>
  );
};

export default Sidebar;
