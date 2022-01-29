import React, { useState } from "react";
import ChannelTitle from "./ChannelTitle";
import { Category } from "./ChannelCategory.styles";
import chevronDown from "../../assets/chevron-down-solid.svg";
import chevronRight from "../../assets/chevron-right-solid.svg";

const ChannelCategory = ({ name, channels, activeChannel }) => {
  const [showChannels, setShowChannels] = useState(true);
  const toggleShowChannels = () => setShowChannels(!showChannels);
  const isActive = (channel) => channel._id === activeChannel._id;
  return (
    <Category>
      <div className="category-header" onClick={toggleShowChannels}>
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
            />
          )
        )}
      </div>
    </Category>
  );
};

export default ChannelCategory;
