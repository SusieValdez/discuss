import { WebSocketServer } from "ws";
import { nanoid } from "nanoid";

const wss = new WebSocketServer({ port: 8080 });

const state = {
  messages: [],
  roles: {
    1: {
      id: "1",
      name: "Server President",
      color: "#7471DC",
    },
    2: {
      id: "2",
      name: "Member",
      color: "#5C26B9",
    },
  },
  name: "Server Name",
  categories: {
    1: {
      id: "1",
      name: "General",
    },
    2: {
      id: "2",
      name: "Media",
    },
    3: {
      id: "3",
      name: "🐸 ┃ Memes",
    },
  },
  channels: {
    1: {
      id: "1",
      name: "Chat",
      categoryId: "1",
    },
    2: {
      id: "2",
      name: "Suggestions",
      categoryId: "1",
    },
    3: {
      id: "3",
      name: "Promos",
      categoryId: "1",
    },
    4: {
      id: "4",
      name: "Pictures",
      categoryId: "2",
    },
    5: {
      id: "5",
      name: "Videos",
      categoryId: "2",
    },
    6: {
      id: "6",
      name: "Music",
      categoryId: "2",
    },
    7: {
      id: "7",
      name: "Dank",
      categoryId: "3",
    },
    8: {
      id: "8",
      name: "Wholesome",
      categoryId: "3",
    },
    9: {
      id: "9",
      name: "Blursed",
      categoryId: "3",
    },
  },
  users: {},
};

wss.on("connection", (ws) => {
  const userId = nanoid();

  const user = {
    id: userId,
    name: `User: ${userId}`,
    avatarUrl: `https://i.pravatar.cc/300?u=${userId}`,
    legend: "Discuss is Poggers",
    roleId: Math.random() > 0.9 ? "1" : "2",
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
              channelId: action.payload.channelId,
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
