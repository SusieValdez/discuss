import React, { useState } from "react";
import ChannelTitle from "./ChannelTitle";
import { Category } from "./ChannelCategory.styles";
import chevronDown from "../../assets/chevron-down-solid.svg";

const ChannelCategory = ({ name, channels, activeChannel }) => {
  const [showChannels, setShowChannels] = useState(true);
  const toggleShowChannels = () => setShowChannels(!showChannels);
  const isActive = (channel) => channel.id === activeChannel.id;
  return (
    <Category>
      <div className="category-header" onClick={toggleShowChannels}>
        <img src={chevronDown} alt="" />
        {name}
      </div>
      <div>
        {(showChannels ? channels : channels.filter(isActive)).map((c) => (
          <ChannelTitle key={c.id} {...c} isActive={isActive(c)} />
        ))}
      </div>
    </Category>
  );
};

export default ChannelCategory;
