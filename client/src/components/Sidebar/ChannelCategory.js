import React, { useState } from "react";
import ChannelTitle from "./ChannelTitle";
import { Category } from "./ChannelCategory.styles";
import chevronDown from "../../assets/chevron-down-solid.svg";
import chevronRight from "../../assets/chevron-right-solid.svg";
import { MenuItem, useMenuState } from "@szhsin/react-menu";
import { Menu } from "../../ui/Menus";
import { ReactComponent as AddChannel } from "../../assets/plus-solid.svg";

const ChannelCategory = ({
  name,
  channels,
  activeChannel,
  onClickNewChannel,
  onClickEditChannel,
  onClickDeleteChannel,
  onClickEditCategory,
  onClickDeleteCategory,
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
      <div className="category-header" onContextMenu={onRightClickCategory}>
        <div className="category-title" onClick={toggleShowChannels}>
          <img
            src={showChannels ? chevronDown : chevronRight}
            alt="show/hide channels"
          />
          {name}
        </div>
        <AddChannel onClick={onClickNewChannel} />
      </div>
      <div>
        {(showChannels ? channels : channels.filter(isActive)).map(
          (channel) => (
            <ChannelTitle
              key={channel._id}
              {...channel}
              isActive={isActive(channel)}
              onClickEditChannel={() => onClickEditChannel(channel)}
              onClickDeleteChannel={() => onClickDeleteChannel(channel)}
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
        <MenuItem onClick={onClickEditCategory}>Edit Category</MenuItem>
        <MenuItem onClick={onClickDeleteCategory}>Delete Category</MenuItem>
      </Menu>
    </Category>
  );
};

export default ChannelCategory;
