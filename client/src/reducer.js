import { deepUpdate } from "./utils";

const setState = (_, { state: newState }) => ({
  ...newState,
});

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

const userJoinedServer = (state, { user, serverId }) => ({
  ...deepUpdate(
    state,
    ["servers", (server) => server._id === serverId, "users"],
    (users) => [...users, { userId: user._id, roles: ["0"] }]
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

const deleteChannel = (state, { serverId, channelId }) =>
  deepUpdate(
    state,
    ["servers", (server) => server._id === serverId, "channels"],
    (channels) => channels.filter(({ _id }) => _id !== channelId)
  );

const reducers = {
  SET_STATE: setState,
  NEW_MESSAGE: newMessage,
  EDIT_MESSAGE: editMessage,
  USER_JOINED_SERVER: userJoinedServer,
  USER_LEFT_SERVER: userLeftServer,
  ONLINE_STATUS_CHANGED: onlineStatusChanged,
  TYPING_INDICATOR_CHANGED: typingIndicatorChanged,
  DELETE_CHANNEL: deleteChannel,
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
