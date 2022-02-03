import { MongoClient, ObjectId } from "mongodb";
import { nanoid } from "nanoid";

const url = "mongodb://localhost:27017";
const dbName = "discuss";

const client = await new MongoClient(url).connect();
export const db = client.db(dbName);

export async function getServers() {
  return await db.collection("servers").find({}).toArray();
}

export async function newServer(name, ownerId) {
  const categoryId = nanoid();
  const roleId = nanoid();
  const server = {
    name,
    iconUrl: "https://i.pravatar.cc/300?u=" + nanoid(),
    roles: [
      {
        _id: roleId,
        name: "everyone",
        color: "#eee",
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
        _id: nanoid(),
        name: "Chat",
        categoryId,
        messages: [],
        typingUsers: [],
      },
    ],
    users: [{ userId: ownerId, roles: [roleId] }],
  };
  const { insertedId } = await db.collection("servers").insertOne(server);
  return { _id: insertedId.toString(), ...server };
}

export async function addMessage(message, serverId, channelId) {
  await db
    .collection("servers")
    .updateOne(
      { _id: ObjectId(serverId), "channels._id": channelId },
      { $push: { "channels.$.messages": message } }
    );
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
        { $push: { "channels.$.typingUsers": userId } }
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

export async function newUser(user) {
  const { name, email, password, dateOfBirth, avatarUrl, legend } = user;
  const { insertedId } = await db.collection("users").insertOne(user);
  return { userId: insertedId.toString() };
}

export async function getUsers() {
  return await db.collection("users").find({}).toArray();
}

export async function getUserByEmail(email) {
  const user = await db.collection("users").findOne({ email });
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

export async function userJoinedServer(userId, serverId) {
  await db.collection("servers").updateOne(
    { _id: ObjectId(serverId) },
    {
      $push: {
        users: {
          userId,
          roles: ["0"],
        },
      },
    }
  );
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
  const _id = nanoid();
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
    _id: nanoid(),
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
