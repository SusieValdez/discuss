import { WebSocketServer } from "ws";
import {
  addCategory,
  addChannel,
  addMessage,
  addUserCookie,
  deleteUserCookie,
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
  updateUser,
  addRole,
  deleteRole,
  removeRoleFromUser,
  addRoleToUser,
  removeRoleFromAllUsers,
  editRole,
  setDesiredOnlineStatus,
} from "./db.js";
import { getId, hash } from "./utils.js";

const mapLoginCodeToClient = new Map();

const typingTimeouts = {};

const wss = new WebSocketServer({ port: 8080 });

const sendTo = (client, event) => {
  client.send(JSON.stringify(event));
};

const broadcast = (event) => {
  wss.clients.forEach((client) => {
    sendTo(client, event);
  });
};

const secureUser = (user) => ({
  ...user,
  desiredOnlineStatus: undefined,
  password: undefined,
});

const sendState = async (client, cookie, userId) => {
  sendTo(client, {
    kind: "SET_STATE",
    payload: {
      cookie,
      state: {
        userId,
        servers: await getServers(),
        users: (await getUsers()).map((user) => secureUser(user)),
      },
    },
  });
};

const updateOnlineStatus = async (userId, onlineStatus) => {
  onlineStatus = onlineStatus === "invisible" ? "offline" : onlineStatus;
  await setOnlineStatus(userId, onlineStatus);
  broadcast({
    kind: "ONLINE_STATUS_CHANGED",
    payload: {
      userId,
      onlineStatus,
    },
  });
};

const updateTypingUserStatus = async (
  serverId,
  channelId,
  userId,
  typingStatus
) => {
  await setTypingUserStatus(serverId, channelId, userId, typingStatus);
  broadcast({
    kind: "TYPING_INDICATOR_CHANGED",
    payload: {
      serverId,
      channelId,
      userId,
      typingStatus,
    },
  });
};

wss.on("connection", async (ws) => {
  ws.on("close", async () => {
    if (!ws.userId) {
      return;
    }
    // TODO: Only set a user to offline when they are not online on any other devices
    await updateOnlineStatus(ws.userId, "offline");
    ws.userId = undefined;
  });

  ws.on("message", async (data) => {
    const action = JSON.parse(data);
    console.log(action);

    switch (action.kind) {
      case "REGISTER": {
        const { name, email, password, dateOfBirth } = action.payload;
        const { _id, desiredOnlineStatus } = await newUser(
          name,
          email,
          hash(password),
          dateOfBirth
        );
        const cookie = getId();
        ws.userId = _id;
        ws.cookie = cookie;
        await addUserCookie(cookie, ws.userId);
        await sendState(ws, cookie, ws.userId);
        await updateOnlineStatus(ws.userId, desiredOnlineStatus);
        return;
      }
      case "LOGIN": {
        const { email, password } = action.payload;
        const user = await getUserByEmail(email);
        if (!user) {
          return;
        }
        const { _id, password: userPassword, desiredOnlineStatus } = user;
        if (hash(password) !== userPassword) {
          return;
        }
        const cookie = getId();
        ws.userId = _id;
        ws.cookie = cookie;
        await addUserCookie(cookie, ws.userId);
        await sendState(ws, cookie, ws.userId);
        await updateOnlineStatus(ws.userId, desiredOnlineStatus);
        return;
      }
      case "VERIFY_COOKIE": {
        const userCookie = await getUserCookie(action.payload.cookie);
        if (userCookie === null) {
          sendTo(ws, {
            kind: "INVALID_COOKIE",
            payload: {},
          });
          return;
        }
        const { _id: cookie, userId } = userCookie;
        ws.userId = userId;
        ws.cookie = cookie;
        await sendState(ws, cookie, ws.userId);
        const { desiredOnlineStatus } = await getUser(ws.userId);
        await updateOnlineStatus(ws.userId, desiredOnlineStatus);
        return;
      }
      case "REQUEST_LOGIN_CODE": {
        const loginCode = getId();
        mapLoginCodeToClient.set(loginCode, ws);
        sendTo(ws, {
          kind: "SET_LOGIN_CODE",
          payload: {
            loginCode,
          },
        });
        return;
      }
    }

    // Are we logged in + in the app?
    if (!ws.userId) {
      return;
    }

    switch (action.kind) {
      case "LOGOUT": {
        await deleteUserCookie(ws.cookie);
        // TODO: Only set a user to offline when they are not online on any other devices
        await updateOnlineStatus(ws.userId, "offline");
        break;
      }

      case "CONFIRM_LOGIN_CODE": {
        const { loginCode } = action.payload;
        const client = mapLoginCodeToClient.get(loginCode);
        const cookie = getId();
        client.userId = ws.userId;
        client.cookie = cookie;
        await addUserCookie(cookie, client.userId);
        await sendState(client, cookie, client.userId);
        sendTo(ws, {
          kind: "SET_LOGIN_CODE_STATUS",
          payload: {
            status: "successful",
          },
        });
        return;
      }

      case "EDIT_USER": {
        const { updatedUser } = action.payload;
        await updateUser(ws.userId, updatedUser);
        broadcast({
          kind: "EDIT_USER",
          payload: {
            userId: ws.userId,
            updatedUser,
          },
        });
        return;
      }
      case "SET_ONLINE_STATUS": {
        const { userId, desiredOnlineStatus } = action.payload;
        await setDesiredOnlineStatus(userId, desiredOnlineStatus);
        await updateOnlineStatus(userId, desiredOnlineStatus);
        return;
      }

      case "NEW_SERVER": {
        const { name } = action.payload;
        const server = await newServer(name, ws.userId);
        broadcast({
          kind: "NEW_SERVER",
          payload: {
            server,
          },
        });
        return;
      }
      case "EDIT_SERVER": {
        const { serverId, updatedServer } = action.payload;
        await updateServer(serverId, updatedServer);
        broadcast({
          kind: "EDIT_SERVER",
          payload: {
            serverId,
            updatedServer,
          },
        });
        return;
      }
      case "DELETE_SERVER": {
        const { serverId } = action.payload;
        await deleteServer(serverId);
        broadcast({
          kind: "DELETE_SERVER",
          payload: {
            serverId,
          },
        });
        return;
      }

      case "NEW_MESSAGE": {
        const { serverId, channelId, text } = action.payload;
        const message = await addMessage(serverId, channelId, text, ws.userId);
        broadcast({
          kind: "NEW_MESSAGE",
          payload: {
            serverId,
            channelId,
            message,
          },
        });
        return;
      }
      case "EDIT_MESSAGE": {
        const { serverId, channelId, messageId, text } = action.payload;
        await editMessage(serverId, channelId, messageId, text);
        broadcast({
          kind: "EDIT_MESSAGE",
          payload: {
            serverId,
            channelId,
            messageId,
            text,
          },
        });
        return;
      }
      case "DELETE_MESSAGE": {
        const { serverId, channelId, messageId } = action.payload;
        await deleteMessage(serverId, channelId, messageId);
        broadcast({
          kind: "DELETE_MESSAGE",
          payload: {
            serverId,
            channelId,
            messageId,
          },
        });
        return;
      }

      case "USER_JOINED_SERVER": {
        const { serverId } = action.payload;
        const serverUser = await addUserToServer(ws.userId, serverId);
        const user = await getUser(ws.userId);
        broadcast({
          kind: "USER_JOINED_SERVER",
          payload: {
            serverId,
            user: secureUser(user),
            serverUser,
          },
        });
        return;
      }
      case "USER_LEFT_SERVER":
      case "KICK_USER": {
        let { serverId, userId } = action.payload;
        if (!userId) {
          userId = ws.userId;
        }
        await removeUserFromServer(serverId, userId);
        broadcast({
          kind: "USER_LEFT_SERVER",
          payload: {
            serverId,
            userId,
          },
        });
        return;
      }

      case "ADD_CATEGORY": {
        const { serverId, name } = action.payload;
        const category = await addCategory(serverId, name);
        broadcast({
          kind: "ADD_CATEGORY",
          payload: {
            serverId,
            category,
          },
        });
        return;
      }
      case "EDIT_CATEGORY": {
        const { serverId, categoryId, updatedCategory } = action.payload;
        await editCategory(serverId, categoryId, updatedCategory);
        broadcast({
          kind: "EDIT_CATEGORY",
          payload: {
            serverId,
            categoryId,
            updatedCategory,
          },
        });
        return;
      }
      case "DELETE_CATEGORY": {
        const { serverId, categoryId } = action.payload;
        await deleteCategory(serverId, categoryId);
        broadcast({
          kind: "DELETE_CATEGORY",
          payload: {
            serverId,
            categoryId,
          },
        });
        return;
      }

      case "ADD_CHANNEL": {
        const { serverId, categoryId, name } = action.payload;
        const channel = await addChannel(serverId, categoryId, name);
        broadcast({
          kind: "ADD_CHANNEL",
          payload: {
            serverId,
            channel,
          },
        });
        return;
      }
      case "EDIT_CHANNEL": {
        const { serverId, channelId, updatedChannel } = action.payload;
        await editChannel(serverId, channelId, updatedChannel);
        broadcast({
          kind: "EDIT_CHANNEL",
          payload: {
            serverId,
            channelId,
            updatedChannel,
          },
        });
        return;
      }
      case "DELETE_CHANNEL": {
        const { serverId, channelId } = action.payload;
        await deleteChannel(serverId, channelId);
        broadcast({
          kind: "DELETE_CHANNEL",
          payload: {
            serverId,
            channelId,
          },
        });
        return;
      }

      case "TYPING_INDICATOR_CHANGED": {
        const { serverId, channelId, typingStatus } = action.payload;
        if (typingStatus) {
          const savedLoggedInUserId = ws.userId;
          const key = `${serverId}-${channelId}-${savedLoggedInUserId}`;
          if (typingTimeouts[key]) {
            clearTimeout(typingTimeouts[key]);
          } else {
            await updateTypingUserStatus(serverId, channelId, ws.userId, true);
          }
          typingTimeouts[key] = setTimeout(async () => {
            await updateTypingUserStatus(
              serverId,
              channelId,
              savedLoggedInUserId,
              false
            );
            typingTimeouts[key] = undefined;
          }, 5000);
        } else {
          await updateTypingUserStatus(serverId, channelId, ws.userId, false);
        }
        return;
      }

      case "ADD_ROLE": {
        const { serverId } = action.payload;
        const role = await addRole(serverId);
        broadcast({
          kind: "ADD_ROLE",
          payload: {
            serverId,
            role,
          },
        });
        return;
      }
      case "EDIT_ROLE": {
        const { serverId, roleId, updatedRole } = action.payload;
        await editRole(serverId, roleId, updatedRole);
        broadcast({
          kind: "EDIT_ROLE",
          payload: {
            serverId,
            roleId,
            updatedRole,
          },
        });
        return;
      }
      case "DELETE_ROLE": {
        const { serverId, roleId } = action.payload;
        await removeRoleFromAllUsers(serverId, roleId);
        await deleteRole(serverId, roleId);
        broadcast({
          kind: "DELETE_ROLE",
          payload: {
            serverId,
            roleId,
          },
        });
        return;
      }

      case "ADD_ROLE_TO_USER": {
        const { serverId, userId, roleId } = action.payload;
        await addRoleToUser(serverId, userId, roleId);
        broadcast({
          kind: "ADD_ROLE_TO_USER",
          payload: {
            serverId,
            userId,
            roleId,
          },
        });
        return;
      }
      case "REMOVE_ROLE_FROM_USER": {
        const { serverId, userId, roleId } = action.payload;
        await removeRoleFromUser(serverId, userId, roleId);
        broadcast({
          kind: "REMOVE_ROLE_FROM_USER",
          payload: {
            serverId,
            userId,
            roleId,
          },
        });
        return;
      }

      default:
        console.error("unexpected action: " + JSON.stringify(action));
    }
  });
});
