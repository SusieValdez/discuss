import { MongoClient, ObjectId } from "mongodb";

const url = "mongodb://localhost:27017";
const dbName = "discuss";

const client = await new MongoClient(url).connect();
const db = client.db(dbName);

// Temporary way to flush out users between server resets
await db
  .collection("servers")
  .updateOne(
    { _id: ObjectId("61eb2e82387a1c216568e356") },
    { $set: { userIds: [] } }
  );

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

export async function newUser(user) {
  const { insertedId } = await db.collection("users").insertOne(user);
  return { userId: insertedId.toString() };
}

export async function getUsers() {
  return await db.collection("users").find({}).toArray();
}

export async function userJoinedServer(userId, serverId) {
  await db
    .collection("servers")
    .updateOne({ _id: ObjectId(serverId) }, { $push: { userIds: userId } });
}

export async function userLeftServer(userId, serverId) {
  await db
    .collection("servers")
    .updateOne(
      { _id: ObjectId(serverId) },
      { $pull: { userIds: { $eq: userId } } }
    );
}
