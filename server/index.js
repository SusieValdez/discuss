import { WebSocketServer } from "ws";
import { nanoid } from "nanoid";
import {
  addMessage,
  getServers,
  getUsers,
  newUser,
  userJoinedServer,
  userLeftServer,
} from "./db.js";

const wss = new WebSocketServer({ port: 8080 });

wss.on("connection", async (ws) => {
  const user = {
    name: `User: ${nanoid()}`,
    avatarUrl: `https://i.pravatar.cc/300?u=${nanoid()}`,
    legend: "Discuss is Poggers",
    roleId: Math.random() > 0.9 ? "1" : "2",
  };

  const servers = await getServers();
  const { userId } = await newUser(user);
  await userJoinedServer(userId, servers[0]._id);

  ws.send(
    JSON.stringify({
      kind: "SET_STATE",
      payload: {
        state: {
          servers: await getServers(),
          users: await getUsers(),
        },
      },
    })
  );

  wss.clients.forEach((client) => {
    client.send(
      JSON.stringify({
        kind: "USER_JOINED",
        payload: {
          serverId: servers[0]._id,
          user,
        },
      })
    );
  });

  ws.on("close", async () => {
    userLeftServer(userId, servers[0]._id);
    wss.clients.forEach((client) => {
      client.send(
        JSON.stringify({
          kind: "USER_LEFT",
          payload: {
            serverId: servers[0]._id,
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
