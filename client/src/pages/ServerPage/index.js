import { Navigate, useParams } from "react-router-dom";
import Chat from "../../components/Chat";
import Sidebar from "../../components/Sidebar";
import { arrayToMap, isUserInServer } from "../../utils";
import { Container } from "./ServerPage.styles";

function ServerPage({
  servers,
  localUser,
  users,
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
  onClickAddRole,
  onEditRole,
  onClickDeleteRole,
  onAddNewRoleToUser,
  onRemoveRoleFromUser,
  onChangeOnlineStatus,
}) {
  let { serverId, channelId } = useParams();

  const server = servers.find((s) => s._id === serverId);
  if (!server) {
    return <Navigate to="/" replace={true} />;
  }
  const { categories, roles, channels, users: serverUserInfo } = server;

  if (!isUserInServer(localUser, server)) {
    return <Navigate to="/" replace={true} />;
  }

  const activeChannel = channels.find((channel) => channel._id === channelId);
  if (!activeChannel) {
    const topChannel = channels.find(
      (channel) => channel.categoryId === categories[0]._id
    );
    if (topChannel) {
      return (
        <Navigate
          to={`/servers/${serverId}/channels/${topChannel._id}`}
          replace={true}
        />
      );
    }
  }

  const serverUserMap = arrayToMap(serverUserInfo, "userId");
  const rolesMap = arrayToMap(roles);
  const serverUsers = users.map((user) => ({
    ...user,
    roles: serverUserMap[user._id]?.roles.map((roleId) => rolesMap[roleId]),
  }));
  localUser = {
    ...localUser,
    roles: serverUserMap[localUser._id]?.roles.map(
      (roleId) => rolesMap[roleId]
    ),
  };
  const userMap = arrayToMap(serverUsers);

  const expandedActiveChannel = activeChannel && {
    ...activeChannel,
    ...channels.find((channel) => channel._id === channelId),
    messages: activeChannel?.messages.map((message) => ({
      ...message,
      user: userMap[message.userId],
    })),
  };

  return (
    <Container>
      <Sidebar
        server={server}
        serverUsers={serverUsers}
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
        onClickAddRole={onClickAddRole(serverId)}
        onEditRole={onEditRole(serverId)}
        onClickDeleteRole={onClickDeleteRole(serverId)}
        onAddNewRoleToUser={onAddNewRoleToUser(serverId)}
        onRemoveRoleFromUser={onRemoveRoleFromUser(serverId)}
        onChangeOnlineStatus={onChangeOnlineStatus(localUser._id)}
      />
      <Chat
        server={server}
        activeChannel={expandedActiveChannel}
        localUser={localUser}
        roles={roles}
        users={serverUsers}
        userMap={userMap}
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
