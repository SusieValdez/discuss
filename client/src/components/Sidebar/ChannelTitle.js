import React from "react";

import { Title } from "./ChannelTitle.styles.js";

import hashtag from "../../assets/hashtag-solid.svg";

const ChannelTitle = ({ name, isActive }) => (
  <Title isActive={isActive}>
    <img src={hashtag} alt="" />
    {name}
  </Title>
);

export default ChannelTitle;
