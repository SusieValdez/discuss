import { WebSocketServer } from "ws";
import { nanoid } from "nanoid";
import {
  addMessage,
  addUserCookie,
  deleteChannel,
  deleteMessage,
  editMessage,
  getServers,
  getUserByEmail,
  getUserCookie,
  getUsers,
  newUser,
  removeUserFromServer,
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
  let loggedInUserId;

  ws.on("close", async () => {
    if (!loggedInUserId) {
      return;
    }
    await updateOnlineStatus(wss.clients, loggedInUserId, "offline");
  });

  ws.on("message", async (data) => {
    const action = JSON.parse(data);
    console.log(action);
    switch (action.kind) {
      case "NEW_MESSAGE": {
        const message = {
          _id: nanoid(),
          userId: loggedInUserId,
          timestamp: Date.now(),
          text: action.payload.text,
        };
        const { serverId, channelId } = action.payload;
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
      case "EDIT_MESSAGE": {
        const { serverId, channelId, messageId, text } = action.payload;
        await editMessage(serverId, channelId, messageId, text);
        const event = {
          kind: "EDIT_MESSAGE",
          payload: {
            serverId,
            channelId,
            messageId,
            text,
          },
        };
        wss.clients.forEach((client) => {
          client.send(JSON.stringify(event));
        });
        break;
      }
      case "DELETE_MESSAGE": {
        const { serverId, channelId, messageId } = action.payload;
        await deleteMessage(serverId, channelId, messageId);
        const event = {
          kind: "DELETE_MESSAGE",
          payload: {
            serverId,
            channelId,
            messageId,
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
        loggedInUserId = (await newUser(user)).userId;
        const cookie = nanoid();
        await addUserCookie(cookie, loggedInUserId);
        // Temporarily have a user join a server when they register
        const servers = await getServers();
        await userJoinedServer(loggedInUserId, servers[0]._id.toString());

        await sendState(ws, cookie, loggedInUserId);
        await updateOnlineStatus(wss.clients, loggedInUserId, "online");

        // Temporarily have a user join a server when they register
        wss.clients.forEach((client) => {
          client.send(
            JSON.stringify({
              kind: "USER_JOINED_SERVER",
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
        loggedInUserId = _id;
        const cookie = nanoid();
        await addUserCookie(cookie, loggedInUserId);
        await sendState(ws, cookie, loggedInUserId);
        await updateOnlineStatus(wss.clients, loggedInUserId, "online");
        break;
      }
      case "VERIFY_COOKIE": {
        const userCookie = await getUserCookie(action.payload.cookie);
        if (userCookie === null) {
          return;
        }
        const { _id: cookie } = userCookie;
        loggedInUserId = userCookie.userId;
        await sendState(ws, cookie, loggedInUserId);
        await updateOnlineStatus(wss.clients, loggedInUserId, "online");
        break;
      }
      case "TYPING_INDICATOR_CHANGED": {
        const { serverId, channelId, typingStatus } = action.payload;
        await setTypingUserStatus(
          serverId,
          channelId,
          loggedInUserId,
          typingStatus
        );
        wss.clients.forEach((client) => {
          client.send(
            JSON.stringify({
              kind: "TYPING_INDICATOR_CHANGED",
              payload: {
                serverId,
                channelId,
                userId: loggedInUserId,
                typingStatus,
              },
            })
          );
        });
        break;
      }
      case "KICK_USER": {
        const { serverId, userId } = action.payload;
        await removeUserFromServer(serverId, userId);
        wss.clients.forEach((client) => {
          client.send(
            JSON.stringify({
              kind: "USER_LEFT_SERVER",
              payload: {
                serverId,
                userId,
              },
            })
          );
        });
        break;
      }
      case "DELETE_CHANNEL": {
        const { serverId, channelId } = action.payload;
        await deleteChannel(serverId, channelId);
        const event = {
          kind: "DELETE_CHANNEL",
          payload: {
            serverId,
            channelId,
          },
        };
        wss.clients.forEach((client) => {
          client.send(JSON.stringify(event));
        });
        break;
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
