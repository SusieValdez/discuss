import { deepUpdate } from "./utils";

const setState = (_, { state: newState }) => ({
  ...newState,
});

const newServer = (state, { server }) =>
  deepUpdate(state, ["servers"], (servers) => [...servers, server]);

const editServer = (state, { serverId, updatedServer }) =>
  deepUpdate(
    state,
    ["servers", (server) => server._id === serverId],
    (server) => ({ ...server, ...updatedServer })
  );

const deleteServer = (state, { serverId }) =>
  deepUpdate(state, ["servers"], (servers) =>
    servers.filter(({ _id }) => _id !== serverId)
  );

const newMessage = (state, { message, serverId, channelId }) =>
  deepUpdate(
    state,
    [
      "servers",
      (server) => server._id === serverId,
      "channels",
      (channel) => channel._id === channelId,
      "messages",
    ],
    (messages) => [...messages, message]
  );

const editMessage = (state, { serverId, channelId, messageId, text }) =>
  deepUpdate(
    state,
    [
      "servers",
      (server) => server._id === serverId,
      "channels",
      (channel) => channel._id === channelId,
      "messages",
      (message) => message._id === messageId,
    ],
    (message) => ({ ...message, text })
  );

const deleteMessage = (state, { serverId, channelId, messageId }) =>
  deepUpdate(
    state,
    [
      "servers",
      (server) => server._id === serverId,
      "channels",
      (channel) => channel._id === channelId,
      "messages",
    ],
    (messages) => messages.filter(({ _id }) => _id !== messageId)
  );

const editUser = (state, { userId, updatedUser }) =>
  deepUpdate(state, ["users", (user) => user._id === userId], (user) => ({
    ...user,
    ...updatedUser,
  }));

const userJoinedServer = (state, { user, serverUser, serverId }) => ({
  ...deepUpdate(
    state,
    ["servers", (server) => server._id === serverId, "users"],
    (users) => [...users, serverUser]
  ),
  users: [...state.users, user],
});

const userLeftServer = (state, { userId, serverId }) =>
  deepUpdate(
    state,
    ["servers", (server) => server._id === serverId, "users"],
    (users) => users.filter(({ userId: id }) => id !== userId)
  );

const onlineStatusChanged = (state, { userId, onlineStatus }) =>
  deepUpdate(state, ["users", (user) => user._id === userId], (user) => ({
    ...user,
    onlineStatus,
  }));

const typingIndicatorChanged = (
  state,
  { serverId, channelId, userId, typingStatus }
) => {
  if (typingStatus) {
    return deepUpdate(
      state,
      [
        "servers",
        (server) => server._id === serverId,
        "channels",
        (channel) => channel._id === channelId,
        "typingUsers",
      ],
      (typingUsers) => [...typingUsers, userId]
    );
  } else {
    return deepUpdate(
      state,
      [
        "servers",
        (server) => server._id === serverId,
        "channels",
        (channel) => channel._id === channelId,
        "typingUsers",
      ],
      (typingUsers) => typingUsers.filter((uid) => uid !== userId)
    );
  }
};

const addCategory = (state, { serverId, category }) =>
  deepUpdate(
    state,
    ["servers", (server) => server._id === serverId, "categories"],
    (categories) => [...categories, category]
  );

const editCategory = (state, { serverId, categoryId, updatedCategory }) =>
  deepUpdate(
    state,
    [
      "servers",
      (server) => server._id === serverId,
      "categories",
      (category) => category._id === categoryId,
    ],
    (category) => ({ ...category, ...updatedCategory })
  );

const deleteCategory = (state, { serverId, categoryId }) => {
  state = deepUpdate(
    state,
    ["servers", (server) => server._id === serverId, "categories"],
    (categories) => categories.filter(({ _id }) => _id !== categoryId)
  );
  return deepUpdate(
    state,
    [
      "servers",
      (server) => server._id === serverId,
      "channels",
      (channel) => channel.categoryId === categoryId,
    ],
    (channel) => ({
      ...channel,
      categoryId: undefined,
    })
  );
};

const addChannel = (state, { serverId, channel }) =>
  deepUpdate(
    state,
    ["servers", (server) => server._id === serverId, "channels"],
    (channels) => [...channels, channel]
  );

const editChannel = (state, { serverId, channelId, updatedChannel }) =>
  deepUpdate(
    state,
    [
      "servers",
      (server) => server._id === serverId,
      "channels",
      (channel) => channel._id === channelId,
    ],
    (channel) => ({ ...channel, ...updatedChannel })
  );

const deleteChannel = (state, { serverId, channelId }) =>
  deepUpdate(
    state,
    ["servers", (server) => server._id === serverId, "channels"],
    (channels) => channels.filter(({ _id }) => _id !== channelId)
  );

const addRole = (state, { serverId, role }) =>
  deepUpdate(
    state,
    ["servers", (server) => server._id === serverId, "roles"],
    (roles) => [...roles.slice(0, -1), role, roles[roles.length - 1]]
  );

const deleteRole = (state, { serverId, roleId }) =>
  deepUpdate(
    deepUpdate(
      state,
      ["servers", (server) => server._id === serverId, "users"],
      (users) =>
        users.map((user) => ({
          ...user,
          roles: user.roles.filter((id) => id !== roleId),
        }))
    ),
    ["servers", (server) => server._id === serverId, "roles"],
    (roles) => roles.filter(({ _id }) => _id !== roleId)
  );

const addRoleToUser = (state, { serverId, userId, roleId }) =>
  deepUpdate(
    state,
    [
      "servers",
      (server) => server._id === serverId,
      "users",
      (user) => user.userId === userId,
      "roles",
    ],
    (roles) => [...roles, roleId]
  );

const removeRoleFromUser = (state, { serverId, userId, roleId }) =>
  deepUpdate(
    state,
    [
      "servers",
      (server) => server._id === serverId,
      "users",
      (user) => user.userId === userId,
      "roles",
    ],
    (roles) => roles.filter((id) => id !== roleId)
  );

const reducers = {
  NEW_SERVER: newServer,
  EDIT_SERVER: editServer,
  DELETE_SERVER: deleteServer,
  SET_STATE: setState,
  NEW_MESSAGE: newMessage,
  EDIT_MESSAGE: editMessage,
  DELETE_MESSAGE: deleteMessage,
  EDIT_USER: editUser,
  USER_JOINED_SERVER: userJoinedServer,
  USER_LEFT_SERVER: userLeftServer,
  ONLINE_STATUS_CHANGED: onlineStatusChanged,
  TYPING_INDICATOR_CHANGED: typingIndicatorChanged,
  ADD_CATEGORY: addCategory,
  EDIT_CATEGORY: editCategory,
  DELETE_CATEGORY: deleteCategory,
  ADD_CHANNEL: addChannel,
  EDIT_CHANNEL: editChannel,
  DELETE_CHANNEL: deleteChannel,
  ADD_ROLE: addRole,
  DELETE_ROLE: deleteRole,
  ADD_ROLE_TO_USER: addRoleToUser,
  REMOVE_ROLE_FROM_USER: removeRoleFromUser,
};

const rootReducer = (state, action) => {
  const reducer = reducers[action.kind];
  if (!reducer) {
    console.error("unexpected action: " + JSON.stringify(action));
    return state;
  }
  return reducer(state, action.payload);
};

export default rootReducer;
