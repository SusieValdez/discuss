import React from "react";

import { Title } from "./ChannelTitle.styles.js";

import hashtag from "../../assets/hashtag-solid.svg";

const ChannelTitle = ({ name }) => (
  <Title>
    <img src={hashtag} />
    {name}
  </Title>
);

export default ChannelTitle;
