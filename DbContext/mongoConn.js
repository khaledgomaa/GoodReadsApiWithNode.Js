const { MongoClient } = require("mongodb");
const config = require("../config.json");

const initalizeDb = async () => {
  const mongoClient = new MongoClient(config.dbSettings.url);
  await mongoClient.connect();
  const db = mongoClient.db(config.dbSettings.dbName);

  return {
    userCollection: db.collection("users"),
    bookCollection: db.collection("books"),
    userBookCollection: db.collection("userBooks"),
  };
};
