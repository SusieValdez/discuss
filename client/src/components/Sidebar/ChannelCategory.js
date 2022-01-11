import React, { useState } from "react";
import ChannelTitle from "./ChannelTitle";
import { Category } from "./ChannelCategory.styles";
import chevronDown from "../../assets/chevron-down-solid.svg";

const ChannelCategory = ({ name, channels, activeChannelName }) => {
  const [showChannels, setShowChannels] = useState(true);
  const toggleShowChannels = () => setShowChannels(!showChannels);
  const isActive = (channel) =>
    channel.name.toLowerCase() === activeChannelName;
  return (
    <Category>
      <div className="category-header" onClick={toggleShowChannels}>
        <img src={chevronDown} alt="" />
        {name}
      </div>
      <div>
        {(showChannels ? channels : channels.filter(isActive)).map((c, i) => (
          <ChannelTitle key={i} {...c} isActive={isActive(c)} />
        ))}
      </div>
    </Category>
  );
};

export default ChannelCategory;
