import { React } from "react";
//Components
import ChannelCategory from "./ChannelCategory";
// Styles
import { Container, Header } from "./Sidebar.styles";

const Sidebar = () => {
  return (
    <Container>
      <Header>Server Name</Header>
      <ChannelCategory
        name="General"
        channels={["Chat", "Suggestions", "Promo"]}
      />
      <ChannelCategory
        name="Media"
        channels={["Pictures", "Videos", "Music"]}
      />
      <ChannelCategory
        name="Memes"
        channels={["Dank", "Wholesome", "Blursed"]}
      />
    </Container>
  );
};

export default Sidebar;
