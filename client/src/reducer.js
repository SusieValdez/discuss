import { deepUpdate } from "./utils";

const setState = (_, { state: newState }) => ({
  ...newState,
});

const newMessage = (state, { message, serverId, channelId }) =>
  deepUpdate(
    state,
    [
      "servers",
      (server) => server.id === serverId,
      "channels",
      (channel) => channel.id === channelId,
      "messages",
    ],
    (messages) => [...messages, message]
  );

const userJoined = (state, { user }) => ({
  ...state,
  users: [...state.users, user],
});

const userLeft = (state, { userId }) => ({
  ...state,
  users: state.users.filter((u) => u.id !== userId),
});

const reducers = {
  SET_STATE: setState,
  NEW_MESSAGE: newMessage,
  USER_JOINED: userJoined,
  USER_LEFT: userLeft,
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
