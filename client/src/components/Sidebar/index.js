import { React } from "react";
//Components
import ChannelCategory from "./ChannelCategory";
// Styles
import { Container, Header } from "./Sidebar.styles";

const Sidebar = ({ serverName, categories }) => {
  return (
    <Container>
      <Header>{serverName}</Header>
      {categories.map((c) => (
        <ChannelCategory key={c.id} {...c} />
      ))}
    </Container>
  );
};

export default Sidebar;
