import { randomUser } from "@/db/seeds/index_seed";
import { default as ConnectDB } from "@/services/Mongo_DB_Service";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import express, { Request, Response } from "express";
import { routes } from "./routers/index_router";
import session from 'express-session'
import MongoDatabase from "@/services/Mongo_DB_Service";
import oauth from "@/routers/OAuth_router"
import 'dotenv/config'
import  GoogleAuthService  from "@/services/Google_Auth_Service";
import { RunAllFlashSale } from "@/controllers/Flash_Sale_Controller";


dotenv.config();
const app = express();

// Initialize Google OAuth service
const googleAuthService = new GoogleAuthService();

// Initialize Express session middleware
googleAuthService.initializeMiddleware(app);

app.use(bodyParser.json());
app.use(cookieParser());
routes(app);
app.set("view engine", "ejs");
app.use(express.json());

const port = process.env.PORT || 3000;
const mongoUrl = process.env.MONGO_URL || "mongodb://localhost:27017/";

const dbName = "mydatabase";
//Collection name in MongoDB
// const collectionShop = "Shops";

app.use(cookieParser());

const startServer = async () => {
	try {
		// MONGO_DB
		const mongodb = new ConnectDB(`${mongoUrl}${dbName}`);
		await mongodb.connect();
		await randomUser(2);
		await RunAllFlashSale();

		
		//ROUTE
		app.get('/', (req, res) => {
			res.send("Hello")
		});

		app.post("/shop-adding", (req: Request, res: Response) => {
			console.log("\n BODY: ", req);
			res.send(req.body);
		});

		// SERVER RUNNING PORT
		app.listen(port, () => {
			console.log(`Server is running on port ${port}`);
		});

		// randomUser(2)
	} catch (error) { }
};

startServer();
