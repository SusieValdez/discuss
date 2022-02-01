import React, { useState } from "react";
import ChannelTitle from "./ChannelTitle";
import { Category } from "./ChannelCategory.styles";
import chevronDown from "../../assets/chevron-down-solid.svg";
import chevronRight from "../../assets/chevron-right-solid.svg";
import { MenuItem, useMenuState } from "@szhsin/react-menu";
import { Menu } from "../../ui/Menus";

const ChannelCategory = ({
  name,
  channels,
  activeChannel,
  onClickDeleteChannel,
}) => {
  const [showChannels, setShowChannels] = useState(true);
  const toggleShowChannels = () => setShowChannels(!showChannels);
  const isActive = (channel) => channel._id === activeChannel._id;

  const categoryMenu = useMenuState();
  const [anchorPoint, setAnchorPoint] = useState({ x: 0, y: 0 });

  const onRightClickCategory = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setAnchorPoint({ x: e.clientX, y: e.clientY });
    categoryMenu.toggleMenu(true);
  };

  return (
    <Category>
      <div
        className="category-header"
        onClick={toggleShowChannels}
        onContextMenu={onRightClickCategory}
      >
        <img src={showChannels ? chevronDown : chevronRight} alt="" />
        {name}
      </div>
      <div>
        {(showChannels ? channels : channels.filter(isActive)).map(
          (channel) => (
            <ChannelTitle
              key={channel._id}
              {...channel}
              isActive={isActive(channel)}
              onClickDeleteChannel={onClickDeleteChannel(channel._id)}
            />
          )
        )}
      </div>
      <Menu
        state={categoryMenu.state}
        endTransition={categoryMenu.endTransition}
        anchorPoint={anchorPoint}
        onClose={() => categoryMenu.toggleMenu(false)}
      >
        <MenuItem>Edit Category</MenuItem>
        <MenuItem>Delete Category</MenuItem>
      </Menu>
    </Category>
  );
};

export default ChannelCategory;
