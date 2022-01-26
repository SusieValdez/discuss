import { WebSocketServer } from "ws";
import { nanoid } from "nanoid";
import {
  addMessage,
  addUserCookie,
  getServers,
  getUserByEmail,
  getUserCookie,
  getUsers,
  newUser,
  userJoinedServer,
  userLeftServer,
} from "./db.js";

const wss = new WebSocketServer({ port: 8080 });

const sendState = async (ws, cookie, userId) => {
  ws.send(
    JSON.stringify({
      kind: "SET_STATE",
      payload: {
        cookie,
        state: {
          userId,
          servers: await getServers(),
          users: await getUsers(),
        },
      },
    })
  );
};

wss.on("connection", async (ws) => {
  let userId;

  ws.on("close", async () => {
    // userLeftServer(userId, servers[0]._id);
    // wss.clients.forEach((client) => {
    //   client.send(
    //     JSON.stringify({
    //       kind: "USER_LEFT",
    //       payload: {
    //         serverId: servers[0]._id,
    //         userId,
    //       },
    //     })
    //   );
    // });
  });

  ws.on("message", async (data) => {
    const action = JSON.parse(data);
    console.log(action);
    switch (action.kind) {
      case "NEW_MESSAGE": {
        const message = {
          userId,
          timestamp: Date.now(),
          text: action.payload.text,
        };
        const serverId = action.payload.serverId;
        const channelId = action.payload.channelId;
        await addMessage(message, serverId, channelId);
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
      }
      case "REGISTER": {
        const user = {
          ...action.payload,
          name: action.payload.username,
          avatarUrl: `https://i.pravatar.cc/300?u=${nanoid()}`,
          legend: "Discuss is Poggers",
          roleId: Math.random() > 0.9 ? "1" : "2",
        };
        userId = (await newUser(user)).userId;
        const cookie = nanoid();
        await addUserCookie(cookie, userId);
        // Temporarily have a user join a server when they register
        await userJoinedServer(userId, servers[0]._id.toString());

        await sendState(ws, cookie, userId);

        // Temporarily have a user join a server when they register
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
        break;
      }
      case "LOGIN": {
        const { _id, password } = await getUserByEmail(action.payload.email);
        if (action.payload.password !== password) {
          return;
        }
        userId = _id;
        const cookie = nanoid();
        await addUserCookie(cookie, userId);
        await sendState(ws, cookie, userId);
        break;
      }
      case "VERIFY_COOKIE": {
        const userCookie = await getUserCookie(action.payload.cookie);
        if (userCookie === null) {
          return;
        }
        const { _id: cookie } = userCookie;
        userId = userCookie.userId;
        await sendState(ws, cookie, userId);
        break;
      }
      default:
        console.error("unexpected action: " + JSON.stringify(action));
    }
  });
});
