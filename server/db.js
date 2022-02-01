import { MongoClient, ObjectId } from "mongodb";

const url = "mongodb://localhost:27017";
const dbName = "discuss";

const client = await new MongoClient(url).connect();
export const db = client.db(dbName);

export async function getServers() {
  return await db.collection("servers").find({}).toArray();
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
