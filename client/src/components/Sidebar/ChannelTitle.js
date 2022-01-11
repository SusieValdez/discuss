import React from "react";

import { Title } from "./ChannelTitle.styles.js";

import hashtag from "../../assets/hashtag-solid.svg";
import { Link } from "react-router-dom";

const ChannelTitle = ({ name, isActive }) => (
  <Link to={`/channels/${name.toLocaleLowerCase()}`}>
    <Title isActive={isActive}>
      <img src={hashtag} alt="" />
      {name}
    </Title>
  </Link>
);

export default ChannelTitle;
