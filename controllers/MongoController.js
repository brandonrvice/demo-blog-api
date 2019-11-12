import { MongoClient } from "mongodb";

class MongoController {
  constructor(dbname, collection) {
    this.dbname = dbname;
    this.collection = collection;
    this.withDB = this.withDB.bind(this);
    this.withCollection = this.withCollection.bind(this);
  }

  async withCollection(operations) {
    const db = await MongoController.getDb(this.dbname);
    const col = db.collection(this.collection);
    return await operations(col);
  }

  async withDB(operations) {
    const db = await MongoController.getDb(this.dbname);
    return operations(db);
  }

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
