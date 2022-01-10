import React, { useState } from "react";
import ChannelTitle from "./ChannelTitle";
import { Category } from "./ChannelCategory.styles";
import chevronDown from "../../assets/chevron-down-solid.svg";

const ChannelCategory = ({ name, channels }) => {
  const [showChannels, setShowChannels] = useState(true);
  const toggleShowChannels = () => setShowChannels(!showChannels);
  return (
    <Category>
      <div className="category-header" onClick={toggleShowChannels}>
        <img src={chevronDown} alt="" />
        {name}
      </div>
      <div>
        {(showChannels ? channels : channels.filter((c) => c.isActive)).map(
          (c, i) => (
            <ChannelTitle key={i} {...c} />
          )
        )}
      </div>
    </Category>
  );
};

export default ChannelCategory;
