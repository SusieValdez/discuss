import { useParams } from "react-router-dom";
import Chat from "../../components/Chat";
import Sidebar from "../../components/Sidebar";
import { arrayToMap } from "../../utils";
import { Container } from "./ServerPage.styles";

function ServerPage({ servers, users, onNewMessage }) {
  let { serverId, channelId } = useParams();
  const { name, categories, roles, channels, userIds } = servers.find(
    (s) => s.id === serverId
  );
  if (channelId === undefined) {
    channelId = channels[0].id;
  }
  const activeChannel = channels.find((c) => c.id === channelId);
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
        onNewMessage={onNewMessage(serverId, channelId)}
        roles={arrayToMap(roles, "id")}
        users={arrayToMap(
          users.filter((u) => userIds.includes(u.id)),
          "id"
        )}
      />
    </Container>
  );
}

export default ServerPage;
