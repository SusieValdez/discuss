import { React } from "react";
//Components
import ChannelCategory from "./ChannelCategory";
// Styles
import { Container, Header } from "./Sidebar.styles";

const Sidebar = ({ serverName, categories, channels, activeChannel }) => {
  return (
    <Container>
      <Header>{serverName}</Header>
      {categories.map(({ _id, name }) => (
        <ChannelCategory
          key={_id}
          name={name}
          channels={channels.filter(({ categoryId }) => categoryId === _id)}
          activeChannel={activeChannel}
        />
      ))}
    </Container>
  );
};

export default Sidebar;
