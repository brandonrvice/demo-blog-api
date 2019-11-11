import { MongoClient } from "mongodb";

class MongoController {
  static async getDb(name) {
    const client = await MongoController.connect();
    const db = client.db(name);
    return db;
  }

  static async connect() {
    const client = await MongoClient.connect(process.env.MONGODB_CONNECTION_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    return client;
  }
}

export default MongoController;
