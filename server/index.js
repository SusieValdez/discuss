import { WebSocketServer } from "ws";
import { nanoid } from "nanoid";

const wss = new WebSocketServer({ port: 8080 });

const adminRoleId = nanoid();
const memberRoleId = nanoid();

const state = {
  messages: [],
  roles: {
    [adminRoleId]: {
      id: adminRoleId,
      name: "Server President",
      color: "#7471DC",
    },
    [memberRoleId]: {
      id: memberRoleId,
      name: "Member",
      color: "#5C26B9",
    },
  },
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
  users: {},
};

wss.on("connection", (ws) => {
  const userId = nanoid();

  const user = {
    id: userId,
    name: `User: ${userId}`,
    avatarUrl: `https://i.pravatar.cc/300?u=${userId}`,
    legend: nanoid(),
    roleId: Math.random() > 0.9 ? adminRoleId : memberRoleId,
  };

  state.users[userId] = user;

  ws.send(
    JSON.stringify({
      kind: "SET_STATE",
      payload: {
        state,
      },
    })
  );

  wss.clients.forEach((client) => {
    client.send(
      JSON.stringify({
        kind: "USER_JOINED",
        payload: {
          user,
        },
      })
    );
  });

  ws.on("close", () => {
    delete state.users[userId];
    wss.clients.forEach((client) => {
      client.send(
        JSON.stringify({
          kind: "USER_LEFT",
          payload: {
            userId,
          },
        })
      );
    });
  });

  ws.on("message", (data) => {
    const action = JSON.parse(data);
    console.log(action);
    switch (action.kind) {
      case "NEW_MESSAGE":
        const event = {
          kind: "NEW_MESSAGE",
          payload: {
            message: {
              userId,
              timestamp: Date.now(),
              text: action.payload.text,
              channelName: action.payload.channelName,
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
