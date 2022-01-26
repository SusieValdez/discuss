import { useParams } from "react-router-dom";
import Chat from "../../components/Chat";
import Sidebar from "../../components/Sidebar";
import { arrayToMap } from "../../utils";
import { Container } from "./ServerPage.styles";

function ServerPage({
  servers,
  users,
  onNewMessage,
  localUserId,
  onClickLogout,
}) {
  let { serverId, channelId } = useParams();
  const { name, categories, roles, channels, userIds } = servers.find(
    (s) => s._id === serverId
  );
  if (channelId === undefined) {
    channelId = channels[0]._id;
  }
  const activeChannel = channels.find((c) => c._id === channelId);

  const userMap = arrayToMap(
    userIds.map((uid) => users.find((u) => u._id === uid))
  );
  const localUser = userMap[localUserId];

  return (
    <Container>
      <Sidebar
        serverName={name}
        categories={categories}
        channels={channels}
        activeChannel={activeChannel}
        localUser={localUser}
        onClickLogout={onClickLogout}
      />
      <Chat
        activeChannel={activeChannel}
        onNewMessage={onNewMessage(serverId, channelId)}
        roles={arrayToMap(roles)}
        users={userMap}
      />
    </Container>
  );
}

export default ServerPage;
