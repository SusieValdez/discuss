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
  setOnlineStatus,
  setTypingUserStatus,
  userJoinedServer,
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

const updateOnlineStatus = async (clients, userId, onlineStatus) => {
  await setOnlineStatus(userId, onlineStatus);
  for (const client of clients) {
    client.send(
      JSON.stringify({
        kind: "ONLINE_STATUS_CHANGED",
        payload: {
          userId,
          onlineStatus,
        },
      })
    );
  }
};

wss.on("connection", async (ws) => {
  let userId;

  ws.on("close", async () => {
    if (!userId) {
      return;
    }
    await updateOnlineStatus(wss.clients, userId, "offline");
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
          avatarUrl: `/default-user-logo.svg`,
          legend: "Discuss is Poggers",
          bannerColor: getRandomColor(),
        };
        userId = (await newUser(user)).userId;
        const cookie = nanoid();
        await addUserCookie(cookie, userId);
        // Temporarily have a user join a server when they register
        const servers = await getServers();
        await userJoinedServer(userId, servers[0]._id.toString());

        await sendState(ws, cookie, userId);
        await updateOnlineStatus(wss.clients, userId, "online");

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
        await updateOnlineStatus(wss.clients, userId, "online");
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
        await updateOnlineStatus(wss.clients, userId, "online");
        break;
      }
      case "TYPING_INDICATOR_CHANGED": {
        const { serverId, channelId, typingStatus } = action.payload;
        await setTypingUserStatus(serverId, channelId, userId, typingStatus);
        wss.clients.forEach((client) => {
          client.send(
            JSON.stringify({
              kind: "TYPING_INDICATOR_CHANGED",
              payload: {
                serverId,
                channelId,
                userId,
                typingStatus,
              },
            })
          );
        });
      }
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
