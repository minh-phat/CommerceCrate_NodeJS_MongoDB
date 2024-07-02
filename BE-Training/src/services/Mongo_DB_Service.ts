import { MongoClient } from "mongodb";
// const mongoUrl = process.env.MONGO_URL || "mongodb://localhost:27017";

class MongoDatabase {
  private client: MongoClient;
  private dbName: string;
  private mongoUrl: string;

  constructor(mongoUrl: string, dbName: string) {
    this.mongoUrl = mongoUrl;
    this.dbName = dbName;
    this.client = new MongoClient(this.mongoUrl);
  }

  public async connect(): Promise<void> {
    try {
      await this.client.connect();
      console.log("Connected to the database");
    } catch (err) {
      console.error("Failed to connect to the database", err);
      process.exit(1);
    }
  }

  public getDb() {
    return this.client.db(this.dbName);
  }
}

export default MongoDatabase;
