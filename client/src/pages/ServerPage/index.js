import { useParams } from "react-router-dom";
import Chat from "../../components/Chat";
import Sidebar from "../../components/Sidebar";
import { Container } from "./ServerPage.styles";

function ServerPage({
  name,
  categories,
  channels,
  messages,
  roles,
  users,
  onNewMessage,
}) {
  const { channelId } = useParams();
  const activeChannel = channels[channelId];
  return (
    <Container>
      <Sidebar
        serverName={name}
        categories={categories}
        channels={channels}
        activeChannel={activeChannel}
      />
      <Chat
        activeChannel={activeChannel}
        messages={messages}
        onNewMessage={onNewMessage(activeChannel.id)}
        roles={roles}
        users={users}
      />
    </Container>
  );
}

export default ServerPage;
