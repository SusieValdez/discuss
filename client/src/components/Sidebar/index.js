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
        channels={[
          { name: "Chat", isActive: true },
          { name: "Suggestions" },
          { name: "Promo" },
        ]}
      />
      <ChannelCategory
        name="Media"
        channels={[{ name: "Pictures" }, { name: "Videos" }, { name: "Music" }]}
      />
      <ChannelCategory
        name="Memes"
        channels={[
          { name: "Dank" },
          { name: "Wholesome" },
          { name: "Blursed" },
        ]}
      />
    </Container>
  );
};

export default Sidebar;
