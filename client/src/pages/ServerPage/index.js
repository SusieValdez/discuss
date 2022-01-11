import { useParams } from "react-router-dom";
import Chat from "../../components/Chat";
import Sidebar from "../../components/Sidebar";
import { Container } from "./ServerPage.styles";

function ServerPage({
  name,
  categories,
  messages,
  roles,
  users,
  onNewMessage,
}) {
  const { channelName } = useParams();
  return (
    <Container>
      <Sidebar
        serverName={name}
        categories={categories}
        activeChannelName={channelName}
      />
      <Chat
        activeChannelName={channelName}
        messages={messages}
        onNewMessage={onNewMessage(channelName)}
        roles={roles}
        users={users}
      />
    </Container>
  );
}

export default ServerPage;
