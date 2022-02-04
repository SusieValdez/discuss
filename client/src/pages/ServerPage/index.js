import { Navigate, useParams } from "react-router-dom";
import Chat from "../../components/Chat";
import Sidebar from "../../components/Sidebar";
import { arrayToMap, isUserInServer } from "../../utils";
import { Container } from "./ServerPage.styles";

function ServerPage({
  servers,
  localUser,
  userMap,
  onUserLeftServer,
  onEditUserAccount,
  onEditServerSettings,
  onClickDeleteServer,
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

  const server = servers.find((s) => s._id === serverId);
  if (!server) {
    return <Navigate to="/" replace={true} />;
  }
  const { categories, roles, channels, users: serverUserData } = server;

  if (!isUserInServer(localUser, server)) {
    return <Navigate to="/" replace={true} />;
  }

  const activeChannel = channels.find((channel) => channel._id === channelId);
  if (!activeChannel) {
    const topChannel = channels.find(
      (channel) => channel.categoryId === categories[0]._id
    );
    return (
      <Navigate
        to={`/servers/${serverId}/channels/${topChannel._id}`}
        replace={true}
      />
    );
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
        server={server}
        categories={categories}
        channels={channels}
        activeChannel={expandedActiveChannel}
        localUser={localUser}
        onUserLeftServer={onUserLeftServer(serverId)}
        onEditUserAccount={onEditUserAccount}
        onEditServerSettings={onEditServerSettings}
        onClickDeleteServer={onClickDeleteServer}
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
