import React, { useState } from "react";

import { Title } from "./ChannelTitle.styles.js";

import hashtag from "../../assets/hashtag-solid.svg";
import { Link, useParams } from "react-router-dom";
import { MenuItem, useMenuState } from "@szhsin/react-menu";
import { Menu } from "../../ui/Menus.js";

const ChannelTitle = ({
  _id,
  name,
  isActive,
  onClickEditChannel,
  onClickDeleteChannel,
}) => {
  const { serverId } = useParams();

  const categoryMenu = useMenuState();
  const [anchorPoint, setAnchorPoint] = useState({ x: 0, y: 0 });

  const onRightClickCategory = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setAnchorPoint({ x: e.clientX, y: e.clientY });
    categoryMenu.toggleMenu(true);
  };

  return (
    <div>
      <Link to={`/servers/${serverId}/channels/${_id}`}>
        <Title isActive={isActive} onContextMenu={onRightClickCategory}>
          <img src={hashtag} alt="" />
          {name}
        </Title>
      </Link>
      <Menu
        state={categoryMenu.state}
        endTransition={categoryMenu.endTransition}
        anchorPoint={anchorPoint}
        onClose={() => categoryMenu.toggleMenu(false)}
      >
        <MenuItem onClick={onClickEditChannel}>Edit Channel</MenuItem>
        <MenuItem onClick={onClickDeleteChannel}>Delete Channel</MenuItem>
      </Menu>
    </div>
  );
};
export default ChannelTitle;
