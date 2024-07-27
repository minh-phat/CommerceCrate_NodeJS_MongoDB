import User from "@/models/Users_Schema";
import ConnectDB from "@/services/Mongo_DB_Service";
import mongoose from "mongoose";

async function migrate() {
	try {
		const dbConnect = new ConnectDB();
		await dbConnect.connect();

		const db = mongoose.connection;
		db.once("open", async () => {
			console.log("Connected to MongoDB");

			const collections = await mongoose.connection.db
				.listCollections()
				.toArray();
			const collectionNames = collections.map((coll) => coll.name);
			if (!collectionNames.includes("users")) {
				await User.createCollection();
				console.log("User collection created successfully");
			} else {
				console.log("User collection already exists");
			}

			await updateUserData();

			process.exit(0);
		});
	} catch (error) {
		console.error("Error connecting to MongoDB:", error);
		process.exit(1);
	}
}

async function updateUserData() {
	try {
		const updateResult = await User.updateMany(
			{},
			{ $set: { isActive: true } }
		);
		console.log("Updated", updateResult);
	} catch (error) {
		console.error("Error updating user data:", error);
		throw error;
	}
}

migrate();
