import express, { Request, Response } from "express";
import MongoDatabase from "@/services/Mongo_DB_Service";
import { randomUser } from "./db/seeds/index_seed";

const app = express();
app.set("view engine", "ejs");
const port = process.env.PORT || 3000;
const mongoUrl = process.env.MONGO_URL || "mongodb://localhost:27017";
const dbName = "mydatabase";

const startServer = async () => {
  try {
    // MONGO_DB
    const database = new MongoDatabase(mongoUrl, dbName);
    database
      .connect()
      .then(() => {
        const db = database.getDb();
        // Tiếp tục các thao tác với db
      })
      .catch((err) => {
        console.error("Error connecting to the database", err);
      });

    //ROUTE
    app.get("/", (req: Request, res: Response) => {
      res.send("Hello World!");
    });

    app.post("/shop-adding", (req: Request, res: Response) => {
      console.log("\n BODY: ", req);
      res.send(req.body);
    });

    // SERVER RUNNING PORT
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });

    randomUser(2)
  } catch (error) { }
};

startServer();
