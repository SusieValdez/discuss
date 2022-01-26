import { React } from "react";
//Components
import ChannelCategory from "./ChannelCategory";
// Styles
import {
  Container,
  Header,
  UserPanel,
  IconContainer,
  UserTag,
} from "./Sidebar.styles";
// Assets
import gearIcon from "../../assets/cog-solid.svg";

const Sidebar = ({
  serverName,
  categories,
  channels,
  activeChannel,
  localUser,
  onClickLogout,
}) => {
  const channelsByCategory = {};
  for (const category of categories) {
    channelsByCategory[category._id] = {
      category,
      channels: [],
    };
  }
  for (const channel of channels) {
    channelsByCategory[channel.categoryId].channels.push(channel);
  }

  return (
    <Container>
      <div>
        <Header>{serverName}</Header>
        {Object.values(channelsByCategory).map(({ category, channels }) => (
          <ChannelCategory
            key={category._id}
            name={category.name}
            channels={channels}
            activeChannel={activeChannel}
          />
        ))}
      </div>
      <UserPanel>
        <UserTag>
          <img src={localUser.avatarUrl} alt="profile pic" />
          <div>
            <h3>{localUser.name}</h3>
            <p>{localUser.legend}</p>
          </div>
        </UserTag>
        <IconContainer>
          <img src={gearIcon} onClick={onClickLogout} alt="settings" />
        </IconContainer>
      </UserPanel>
    </Container>
  );
};

export default Sidebar;
