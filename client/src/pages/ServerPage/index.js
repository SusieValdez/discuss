import { useParams } from "react-router-dom";
import Chat from "../../components/Chat";
import Sidebar from "../../components/Sidebar";
import { arrayToMap } from "../../utils";
import { Container } from "./ServerPage.styles";

function ServerPage({
  servers,
  users: allUsers,
  onNewMessage,
  localUserId,
  onClickLogout,
}) {
  let { serverId, channelId } = useParams();
  const {
    name,
    categories,
    roles,
    channels,
    users: serverUserData,
  } = servers.find((s) => s._id === serverId);
  if (channelId === undefined) {
    channelId = channels[0]._id;
  }

  const rolesMap = arrayToMap(roles);
  const serverUsers = serverUserData.map(({ userId, roles }) => ({
    ...allUsers.find((user) => user._id === userId),
    roles: roles.map((roleId) => rolesMap[roleId]),
  }));
  const serverUserMap = arrayToMap(serverUsers);
  const localUser = serverUserMap[localUserId];

  const activeChannel = channels.find((channel) => channel._id === channelId);
  const expandedActiveChannel = {
    ...channels.find((channel) => channel._id === channelId),
    messages: activeChannel.messages.map((message) => ({
      ...message,
      user: serverUserMap[message.userId],
    })),
  };

  return (
    <Container>
      <Sidebar
        serverName={name}
        categories={categories}
        channels={channels}
        activeChannel={expandedActiveChannel}
        localUser={localUser}
        onClickLogout={onClickLogout}
      />
      <Chat
        activeChannel={expandedActiveChannel}
        onNewMessage={onNewMessage(serverId, channelId)}
        roles={roles}
        users={serverUsers}
      />
    </Container>
  );
}

export default ServerPage;
