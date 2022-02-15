import { MongoClient, ObjectId } from "mongodb";
import { getRandomColor, getId } from "./utils.js";

const url = "mongodb://localhost:27017";
const dbName = "discuss";

const client = await new MongoClient(url).connect();
export const db = client.db(dbName);

export async function getServers() {
  return await db.collection("servers").find({}).toArray();
}

export async function getServer(_id) {
  const server = await db.collection("servers").findOne({ _id: ObjectId(_id) });
  return {
    ...server,
    _id: server._id.toString(),
  };
}

export async function newServer(name, ownerId) {
  const categoryId = getId();
  const everyoneRoleId = getId();
  const server = {
    name,
    ownerId,
    iconUrl: "",
    description: "",
    bannerColor: getRandomColor(),
    bannerImageUrl: `https://picsum.photos/id/${Math.floor(
      Math.random() * 1000
    )}/200/300`,
    roles: [
      {
        _id: everyoneRoleId,
        name: "everyone",
        color: "#eeeeee",
        permissions: {
          "view-channels": true,
          "manage-channels": false,
          "manage-roles": false,
          "manage-server": false,
          "kick-members": false,
          "ban-members": false,
        },
      },
    ],
    categories: [
      {
        _id: categoryId,
        name: "General",
      },
    ],
    channels: [
      {
        _id: getId(),
        name: "Chat",
        categoryId,
        messages: [],
        typingUsers: [],
      },
    ],
    users: [{ userId: ownerId, roles: [everyoneRoleId] }],
  };
  const { insertedId } = await db.collection("servers").insertOne(server);
  return { _id: insertedId.toString(), ...server };
}

export async function updateServer(serverId, updatedServer) {
  await db
    .collection("servers")
    .updateOne({ _id: ObjectId(serverId) }, { $set: updatedServer });
}

export async function deleteServer(serverId) {
  await db.collection("servers").deleteOne({ _id: ObjectId(serverId) });
}

export async function addMessage(serverId, channelId, text, userId) {
  const message = {
    _id: getId(),
    userId,
    timestamp: Date.now(),
    text,
  };
  await db
    .collection("servers")
    .updateOne(
      { _id: ObjectId(serverId), "channels._id": channelId },
      { $push: { "channels.$.messages": message } }
    );
  return message;
}

export async function editMessage(serverId, channelId, messageId, text) {
  await db
    .collection("servers")
    .updateOne(
      { _id: ObjectId(serverId), "channels._id": channelId },
      { $set: { "channels.$.messages.$[message].text": text } },
      { arrayFilters: [{ "message._id": messageId }] }
    );
}

export async function deleteMessage(serverId, channelId, messageId) {
  await db
    .collection("servers")
    .updateOne(
      { _id: ObjectId(serverId), "channels._id": channelId },
      { $pull: { "channels.$.messages": { _id: messageId } } }
    );
}

export async function setTypingUserStatus(
  serverId,
  channelId,
  userId,
  typingStatus
) {
  if (typingStatus) {
    await db
      .collection("servers")
      .updateOne(
        { _id: ObjectId(serverId), "channels._id": channelId },
        { $addToSet: { "channels.$.typingUsers": userId } }
      );
  } else {
    await db
      .collection("servers")
      .updateOne(
        { _id: ObjectId(serverId), "channels._id": channelId },
        { $pull: { "channels.$.typingUsers": { $eq: userId } } }
      );
  }
}

export async function newUser(name, email, password, dateOfBirth) {
  const user = {
    name,
    email,
    password,
    dateOfBirth,
    avatarUrl: "",
    legend: "",
    aboutMe: "",
    bannerColor: getRandomColor(),
    bannerImageUrl: "",
    onlineStatus: "offline",
    desiredOnlineStatus: "online",
  };
  const { insertedId } = await db.collection("users").insertOne(user);
  return { ...user, _id: insertedId.toString() };
}

export async function getUsers() {
  return await db.collection("users").find({}).toArray();
}

export async function getUser(_id) {
  const user = await db.collection("users").findOne({ _id: ObjectId(_id) });
  return {
    ...user,
    _id: user._id.toString(),
  };
}

export async function updateUser(userId, updatedUser) {
  await db
    .collection("users")
    .updateOne({ _id: ObjectId(userId) }, { $set: updatedUser });
}

export async function getUserByEmail(email) {
  const user = await db.collection("users").findOne({ email });
  if (!user) {
    return null;
  }
  return {
    ...user,
    _id: user._id.toString(),
  };
}

export async function setOnlineStatus(userId, onlineStatus) {
  await db
    .collection("users")
    .updateOne({ _id: ObjectId(userId) }, { $set: { onlineStatus } });
}

export async function setDesiredOnlineStatus(userId, desiredOnlineStatus) {
  await db
    .collection("users")
    .updateOne({ _id: ObjectId(userId) }, { $set: { desiredOnlineStatus } });
}

export async function addUserToServer(userId, serverId) {
  const server = await getServer(serverId);
  const everyoneRole = server.roles.find((role) => role.name === "everyone");
  const serverUser = {
    userId,
    roles: [everyoneRole._id],
  };
  await db.collection("servers").updateOne(
    { _id: ObjectId(serverId) },
    {
      $push: {
        users: serverUser,
      },
    }
  );
  return serverUser;
}

export async function removeUserFromServer(serverId, userId) {
  await db
    .collection("servers")
    .updateOne({ _id: ObjectId(serverId) }, { $pull: { users: { userId } } });
}

export async function addUserCookie(cookie, userId) {
  await db.collection("cookies").insertOne({ _id: cookie, userId });
}

export async function getUserCookie(cookie) {
  return await db.collection("cookies").findOne({ _id: cookie });
}

export async function addCategory(serverId, name) {
  const _id = getId();
  await db
    .collection("servers")
    .updateOne(
      { _id: ObjectId(serverId) },
      { $push: { categories: { _id, name } } }
    );
  return { _id, name };
}

export async function editCategory(serverId, categoryId, updatedCategory) {
  const setQuery = Object.entries(updatedCategory).reduce(
    (query, [field, value]) => ({
      ...query,
      [`categories.$[category].${field}`]: value,
    }),
    {}
  );
  await db
    .collection("servers")
    .updateOne(
      { _id: ObjectId(serverId) },
      { $set: setQuery },
      { arrayFilters: [{ "category._id": categoryId }] }
    );
}

export async function deleteCategory(serverId, categoryId) {
  await Promise.all([
    db
      .collection("servers")
      .updateOne(
        { _id: ObjectId(serverId) },
        { $pull: { categories: { _id: categoryId } } }
      ),
    db
      .collection("servers")
      .updateOne(
        { _id: ObjectId(serverId) },
        { $set: { "channels.$[channel].categoryId": undefined } },
        { arrayFilters: [{ "channel.categoryId": categoryId }] }
      ),
  ]);
}

export async function addChannel(serverId, categoryId, name) {
  const channel = {
    _id: getId(),
    name,
    categoryId,
    messages: [],
    typingUsers: [],
  };
  await db
    .collection("servers")
    .updateOne({ _id: ObjectId(serverId) }, { $push: { channels: channel } });
  return channel;
}

export async function editChannel(serverId, channelId, updatedChannel) {
  const setQuery = Object.entries(updatedChannel).reduce(
    (query, [field, value]) => ({
      ...query,
      [`channels.$[channel].${field}`]: value,
    }),
    {}
  );
  await db
    .collection("servers")
    .updateOne(
      { _id: ObjectId(serverId) },
      { $set: setQuery },
      { arrayFilters: [{ "channel._id": channelId }] }
    );
}

export async function deleteChannel(serverId, channelId) {
  await db
    .collection("servers")
    .updateOne(
      { _id: ObjectId(serverId) },
      { $pull: { channels: { _id: channelId } } }
    );
}

export async function addRole(serverId) {
  const role = {
    _id: getId(),
    name: "new role",
    color: "#eeeeee",
    permissions: {
      "view-channels": true,
      "manage-channels": false,
      "manage-roles": false,
      "manage-server": false,
      "kick-members": false,
      "ban-members": false,
    },
  };
  await db.collection("servers").updateOne(
    { _id: ObjectId(serverId) },
    {
      $push: {
        roles: {
          $each: [role],
          $position: -1,
        },
      },
    }
  );
  return role;
}

export async function editRole(serverId, roleId, updatedRole) {
  const setQuery = Object.entries(updatedRole).reduce(
    (query, [field, value]) => ({
      ...query,
      [`roles.$[role].${field}`]: value,
    }),
    {}
  );
  await db
    .collection("servers")
    .updateOne(
      { _id: ObjectId(serverId) },
      { $set: setQuery },
      { arrayFilters: [{ "role._id": roleId }] }
    );
}

export async function deleteRole(serverId, roleId) {
  await db
    .collection("servers")
    .updateOne(
      { _id: ObjectId(serverId) },
      { $pull: { roles: { _id: roleId } } }
    );
}

export async function addRoleToUser(serverId, userId, roleId) {
  await db.collection("servers").updateOne(
    { _id: ObjectId(serverId), "users.userId": userId },
    {
      $push: {
        "users.$.roles": {
          $each: [roleId],
          $position: -1,
        },
      },
    }
  );
}

export async function removeRoleFromUser(serverId, userId, roleId) {
  await db
    .collection("servers")
    .updateOne(
      { _id: ObjectId(serverId), "users.userId": userId },
      { $pull: { "users.$.roles": roleId } }
    );
}

export async function removeRoleFromAllUsers(serverId, roleId) {
  await db
    .collection("servers")
    .updateOne(
      { _id: ObjectId(serverId) },
      { $pull: { "users.$[].roles": roleId } }
    );
}
