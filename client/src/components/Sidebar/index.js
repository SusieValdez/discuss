import { React } from "react";
//Components
import ChannelCategory from "./ChannelCategory";
// Styles
import { Container, Header } from "./Sidebar.styles";

const Sidebar = ({ serverName, categories, channels, activeChannel }) => {
  return (
    <Container>
      <Header>{serverName}</Header>
      {Object.values(categories).map(({ id, name }) => (
        <ChannelCategory
          key={id}
          name={name}
          channels={Object.values(channels).filter(
            ({ categoryId }) => categoryId === id
          )}
          activeChannel={activeChannel}
        />
      ))}
    </Container>
  );
};

export default Sidebar;
