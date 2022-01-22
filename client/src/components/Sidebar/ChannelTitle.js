import React from "react";

import { Title } from "./ChannelTitle.styles.js";

import hashtag from "../../assets/hashtag-solid.svg";
import { Link, useParams } from "react-router-dom";

const ChannelTitle = ({ _id, name, isActive }) => {
  const { serverId } = useParams();
  return (
    <Link to={`/servers/${serverId}/channels/${_id}`}>
      <Title isActive={isActive}>
        <img src={hashtag} alt="" />
        {name}
      </Title>
    </Link>
  );
};
export default ChannelTitle;
