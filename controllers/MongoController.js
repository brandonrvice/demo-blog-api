const { MongoClient } = require("mongodb");

class MongoController {
  constructor(dbname, collection) {
    this.dbname = dbname;
    this.collection = collection;
    this.withDB = this.withDB.bind(this);
    this.withCollection = this.withCollection.bind(this);
  }

  async withCollection(operations) {
    const client = await this.connect();
    const db = await client.db(this.dbname);
    const col = db.collection(this.collection);
    const result = await operations(col);
    client.close();
    return result;
  }

  async withDB(operations) {
    const client = await this.connect();
    const db = await client.db(this.dbname);
    const result = await operations(db);
    client.close();
    return result;
  }

  async connect() {
    const client = await MongoClient.connect(process.env.MONGODB_CONNECTION_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    return client;
  }
}

module.exports = MongoController;
