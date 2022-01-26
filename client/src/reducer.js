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

const userJoined = (state, { user, serverId }) => ({
  ...deepUpdate(
    state,
    ["servers", (server) => server._id === serverId, "userIds"],
    (userIds) => [...userIds, user._id]
  ),
  users: [...state.users, user],
});

const userLeft = (state, { userId, serverId }) =>
  deepUpdate(
    state,
    ["servers", (server) => server._id === serverId, "userIds"],
    (userIds) => userIds.filter((id) => id !== userId)
  );

const onlineStatusChanged = (state, { userId, onlineStatus }) =>
  deepUpdate(state, ["users", (user) => user._id === userId], (user) => ({
    ...user,
    onlineStatus,
  }));

const reducers = {
  SET_STATE: setState,
  NEW_MESSAGE: newMessage,
  USER_JOINED: userJoined,
  USER_LEFT: userLeft,
  ONLINE_STATUS_CHANGED: onlineStatusChanged,
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
