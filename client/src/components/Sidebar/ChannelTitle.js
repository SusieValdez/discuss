import React from "react";

import { Title } from "./ChannelTitle.styles.js";

import hashtag from "../../assets/hashtag-solid.svg";
import { Link } from "react-router-dom";

const ChannelTitle = ({ id, name, isActive }) => (
  <Link to={`/channels/${id}`}>
    <Title isActive={isActive}>
      <img src={hashtag} alt="" />
      {name}
    </Title>
  </Link>
);

export default ChannelTitle;
