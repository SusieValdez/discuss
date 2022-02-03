import { useParams } from "react-router-dom";
import Chat from "../../components/Chat";
import Sidebar from "../../components/Sidebar";
import { arrayToMap } from "../../utils";
import { Container } from "./ServerPage.styles";

function ServerPage({
  servers,
  localUser,
  userMap,
  onNewMessage,
  onMessageEdit,
  onClickDeleteMessage,
  onClickLogout,
  onTypingIndicatorChanged,
  onClickKick,
  onClickNewCategory,
  onEditCategory,
  onClickDeleteCategory,
  onClickNewChannel,
  onEditChannel,
  onClickDeleteChannel,
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
  let activeChannel = channels.find((channel) => channel._id === channelId);
  if (!activeChannel) {
    activeChannel = channels.find((channel) => channel._id === channels[0]._id);
  }

  const rolesMap = arrayToMap(roles);
  const serverUsers = serverUserData.map(({ userId, roles }) => ({
    ...userMap[userId],
    roles: roles.map((roleId) => rolesMap[roleId]),
  }));
  const serverUserMap = arrayToMap(serverUsers);

  const expandedActiveChannel = {
    ...activeChannel,
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
        onClickNewChannel={onClickNewChannel(serverId)}
        onEditChannel={onEditChannel(serverId)}
        onClickDeleteChannel={onClickDeleteChannel(serverId)}
        onClickNewCategory={onClickNewCategory(serverId)}
        onEditCategory={onEditCategory(serverId)}
        onClickDeleteCategory={onClickDeleteCategory(serverId)}
      />
      <Chat
        activeChannel={expandedActiveChannel}
        localUser={localUser}
        roles={roles}
        users={serverUserMap}
        onNewMessage={onNewMessage(serverId, channelId)}
        onMessageEdit={onMessageEdit(serverId, channelId)}
        onTypingIndicatorChanged={onTypingIndicatorChanged(serverId, channelId)}
        onClickKick={onClickKick(serverId)}
        onClickDeleteMessage={onClickDeleteMessage(serverId, channelId)}
      />
    </Container>
  );
}

export default ServerPage;
