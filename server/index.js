import { WebSocketServer } from "ws";
import { nanoid } from "nanoid";

const wss = new WebSocketServer({ port: 8080 });

let state = {
  servers: [
    {
      id: "1",
      name: "Server Name",
      iconUrl: "https://picsum.photos/48?random=1",
      roles: [
        {
          id: "1",
          name: "Server President",
          color: "#7471DC",
        },
        {
          id: "2",
          name: "Member",
          color: "#5C26B9",
        },
      ],
      categories: [
        {
          id: "1",
          name: "General",
        },
        {
          id: "2",
          name: "Media",
        },
        {
          id: "3",
          name: "🐸 ┃ Memes",
        },
      ],
      channels: [
        {
          id: "1",
          name: "Chat",
          categoryId: "1",
          messages: [],
        },
        {
          id: "2",
          name: "Suggestions",
          categoryId: "1",
          messages: [],
        },
        {
          id: "3",
          name: "Promos",
          categoryId: "1",
          messages: [],
        },
        {
          id: "4",
          name: "Pictures",
          categoryId: "2",
          messages: [],
        },
        {
          id: "5",
          name: "Videos",
          categoryId: "2",
          messages: [],
        },
        {
          id: "6",
          name: "Music",
          categoryId: "2",
          messages: [],
        },
        {
          id: "7",
          name: "Dank",
          categoryId: "3",
          messages: [],
        },
        {
          id: "8",
          name: "Wholesome",
          categoryId: "3",
          messages: [],
        },
        {
          id: "9",
          name: "Blursed",
          categoryId: "3",
          messages: [],
        },
      ],
      userIds: [],
    },
  ],
  users: [],
};

function addMessage(message, serverId, channelId) {
  state = {
    ...state,
    servers: state.servers.map((server) =>
      server.id !== serverId
        ? server
        : {
            ...server,
            channels: server.channels.map((channel) =>
              channel.id !== channelId
                ? channel
                : {
                    ...channel,
                    messages: [...channel.messages, message],
                  }
            ),
          }
    ),
  };
}

wss.on("connection", (ws) => {
  const userId = nanoid();

  const user = {
    id: userId,
    name: `User: ${userId}`,
    avatarUrl: `https://i.pravatar.cc/300?u=${userId}`,
    legend: "Discuss is Poggers",
    roleId: Math.random() > 0.9 ? "1" : "2",
  };

  state.servers[0].userIds.push(userId);
  state.users.push(user);

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
    state.servers[0].userIds = state.servers[0].userIds.filter(
      (uid) => uid !== userId
    );
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
        const message = {
          userId,
          timestamp: Date.now(),
          text: action.payload.text,
        };
        const serverId = action.payload.serverId;
        const channelId = action.payload.channelId;
        addMessage(message, serverId, channelId);
        const event = {
          kind: "NEW_MESSAGE",
          payload: {
            serverId,
            channelId,
            message,
          },
        };
        wss.clients.forEach((client) => {
          client.send(JSON.stringify(event));
        });
        break;
      default:
        console.error("unexpected action: " + JSON.stringify(action));
    }
  });
});
