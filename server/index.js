import { WebSocketServer } from "ws";
import { nanoid } from "nanoid";

const wss = new WebSocketServer({ port: 8080 });

const state = {
  messages: [],
  roles: {},
  name: "Server Name",
  categories: [
    {
      id: nanoid(),
      name: "General",
      channels: [
        {
          id: nanoid(),
          name: "Chat",
        },
        {
          id: nanoid(),
          name: "Suggestions",
        },
        {
          id: nanoid(),
          name: "Promos",
        },
      ],
    },
    {
      id: nanoid(),
      name: "Media",
      channels: [
        {
          id: nanoid(),
          name: "Pictures",
        },
        {
          id: nanoid(),
          name: "Videos",
        },
        {
          id: nanoid(),
          name: "Music",
        },
      ],
    },
    {
      id: nanoid(),
      name: "🐸 ┃ Memes",
      channels: [
        {
          id: nanoid(),
          name: "Dank",
        },
        {
          id: nanoid(),
          name: "Wholesome",
        },
        {
          id: nanoid(),
          name: "Blursed",
        },
      ],
    },
  ],
};

wss.on("connection", (ws) => {
  const userId = nanoid();

  state.roles[userId] = getRandomColor();

  const event = {
    kind: "SET_STATE",
    payload: {
      state,
    },
  };
  ws.send(JSON.stringify(event));

  ws.on("message", (data) => {
    const action = JSON.parse(data);
    console.log(action);
    switch (action.kind) {
      case "NEW_MESSAGE":
        const event = {
          kind: "NEW_MESSAGE",
          payload: {
            message: {
              username: `User: ${userId}`,
              avatarUrl: `https://i.pravatar.cc/300?u=${userId}`,
              timestamp: Date.now(),
              text: action.payload.text,
              roleColor: state.roles[userId],
            },
          },
        };
        state.messages.push(event.payload.message);
        wss.clients.forEach((client) => {
          client.send(JSON.stringify(event));
        });
        break;
      default:
        console.error("unexpected action: " + JSON.stringify(action));
    }
  });
});

function getRandomColor() {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
