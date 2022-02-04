import { WebSocketServer } from "ws";
import { nanoid } from "nanoid";
import {
  addCategory,
  addChannel,
  addMessage,
  addUserCookie,
  deleteCategory,
  deleteChannel,
  deleteMessage,
  deleteServer,
  editCategory,
  editChannel,
  editMessage,
  getServers,
  getUserByEmail,
  getUserCookie,
  getUsers,
  newServer,
  newUser,
  removeUserFromServer,
  setOnlineStatus,
  setTypingUserStatus,
  updateServer,
  addUserToServer,
  getUser,
} from "./db.js";
import { getRandomColor } from "./utils.js";

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
    loggedInUserId = undefined;
  });

  ws.on("message", async (data) => {
    const action = JSON.parse(data);
    console.log(action);
    switch (action.kind) {
      case "NEW_SERVER": {
        if (!loggedInUserId) {
          return;
        }
        const { name } = action.payload;
        const server = await newServer(name, loggedInUserId);
        const event = {
          kind: "NEW_SERVER",
          payload: {
            server,
          },
        };
        ws.send(JSON.stringify(event));
        break;
      }
      case "EDIT_SERVER": {
        const { serverId, updatedServer } = action.payload;
        await updateServer(serverId, updatedServer);
        const event = {
          kind: "EDIT_SERVER",
          payload: {
            serverId,
            updatedServer,
          },
        };
        ws.send(JSON.stringify(event));
        break;
      }
      case "DELETE_SERVER": {
        const { serverId } = action.payload;
        await deleteServer(serverId);
        const event = {
          kind: "DELETE_SERVER",
          payload: {
            serverId,
          },
        };
        ws.send(JSON.stringify(event));
        break;
      }
      case "NEW_MESSAGE": {
        if (!loggedInUserId) {
          return;
        }
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
          avatarUrl: "",
          legend: "Discuss is Poggers",
          bannerColor: getRandomColor(),
        };
        loggedInUserId = (await newUser(user)).userId;
        const cookie = nanoid();
        await addUserCookie(cookie, loggedInUserId);
        await sendState(ws, cookie, loggedInUserId);
        await updateOnlineStatus(wss.clients, loggedInUserId, "online");
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
        if (!loggedInUserId) {
          return;
        }
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
      case "USER_JOINED_SERVER": {
        if (!loggedInUserId) {
          return;
        }
        const { serverId } = action.payload;
        const serverUser = await addUserToServer(loggedInUserId, serverId);
        const user = await getUser(loggedInUserId);
        wss.clients.forEach((client) => {
          client.send(
            JSON.stringify({
              kind: "USER_JOINED_SERVER",
              payload: {
                serverId,
                user,
                serverUser,
              },
            })
          );
        });
        break;
      }
      case "USER_LEFT_SERVER":
      case "KICK_USER": {
        if (!loggedInUserId) {
          return;
        }
        let { serverId, userId } = action.payload;
        if (!userId) {
          userId = loggedInUserId;
        }
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
      case "ADD_CATEGORY": {
        const { serverId, name } = action.payload;
        const category = await addCategory(serverId, name);
        wss.clients.forEach((client) => {
          client.send(
            JSON.stringify({
              kind: "ADD_CATEGORY",
              payload: {
                serverId,
                category,
              },
            })
          );
        });
        break;
      }
      case "EDIT_CATEGORY": {
        const { serverId, categoryId, updatedCategory } = action.payload;
        await editCategory(serverId, categoryId, updatedCategory);
        const event = {
          kind: "EDIT_CATEGORY",
          payload: {
            serverId,
            categoryId,
            updatedCategory,
          },
        };
        wss.clients.forEach((client) => {
          client.send(JSON.stringify(event));
        });
        break;
      }
      case "DELETE_CATEGORY": {
        const { serverId, categoryId } = action.payload;
        await deleteCategory(serverId, categoryId);
        const event = {
          kind: "DELETE_CATEGORY",
          payload: {
            serverId,
            categoryId,
          },
        };
        wss.clients.forEach((client) => {
          client.send(JSON.stringify(event));
        });
        break;
      }
      case "ADD_CHANNEL": {
        const { serverId, categoryId, name } = action.payload;
        const channel = await addChannel(serverId, categoryId, name);
        const event = {
          kind: "ADD_CHANNEL",
          payload: {
            serverId,
            channel,
          },
        };
        wss.clients.forEach((client) => {
          client.send(JSON.stringify(event));
        });
        break;
      }
      case "EDIT_CHANNEL": {
        const { serverId, channelId, updatedChannel } = action.payload;
        await editChannel(serverId, channelId, updatedChannel);
        const event = {
          kind: "EDIT_CHANNEL",
          payload: {
            serverId,
            channelId,
            updatedChannel,
          },
        };
        wss.clients.forEach((client) => {
          client.send(JSON.stringify(event));
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
