import { React } from "react";
//Components
import ChannelCategory from "./ChannelCategory";
// Styles
import { Container, Header } from "./Sidebar.styles";

const Sidebar = ({ serverName, categories, activeChannelName }) => {
  return (
    <Container>
      <Header>{serverName}</Header>
      {categories.map((c) => (
        <ChannelCategory
          key={c.id}
          {...c}
          activeChannelName={activeChannelName}
        />
      ))}
    </Container>
  );
};

export default Sidebar;
