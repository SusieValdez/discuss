const setState = (_, { state: newState }) => ({
  ...newState,
  categories: newState.categories.map((category) => ({
    ...category,
    channels: category.channels.map((channel) =>
      channel.name.toLowerCase() === "chat"
        ? { ...channel, isActive: true }
        : channel
    ),
  })),
});

const newMessage = (state, { message }) => ({
  ...state,
  messages: [...state.messages, message],
});

const userJoined = (state, { user }) => ({
  ...state,
  users: { ...state.users, [user.id]: user },
});

const userLeft = (state, { userId }) => ({
  ...state,
  users: Object.values(state.users)
    .filter((u) => u.id !== userId)
    .reduce((users, u) => ({ ...users, [u.id]: u }), {}),
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
