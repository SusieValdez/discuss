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
  return (
    <Container>
      <div>
        <Header>{serverName}</Header>
        {categories.map(({ _id, name }) => (
          <ChannelCategory
            key={_id}
            name={name}
            channels={channels.filter(({ categoryId }) => categoryId === _id)}
            activeChannel={activeChannel}
          />
        ))}
      </div>
      <UserPanel>
        <UserTag>
          <img src={localUser.avatarUrl} alt="profile pic" />
          <div>
            <h3>{localUser.name}</h3>
            <p>#UserId</p>
          </div>
        </UserTag>
        <IconContainer>
          <img src={gearIcon} onClick={onClickLogout} />
        </IconContainer>
      </UserPanel>
    </Container>
  );
};

export default Sidebar;
