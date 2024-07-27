import express from "express";
import AddressRouter from "./Address_Router";
import CartRouter from "./Cart_Router";
import UserRouter from "./User_Router";
import GoogleAuthRouter from "@/routers/Google_Auth_Router";
import ShopRouter from "@/routers/Shops_Routes";
import FlashSaleRouter from "@/routers/Flash_Sale_Router"

export const routes = (app: express.Router) => {
	app.use("/api/user", UserRouter);
	app.use("/api/address", AddressRouter);
	app.use("/api/cart", CartRouter);
	app.use("/auth/google", GoogleAuthRouter);
	app.use("/shop", ShopRouter);
	app.use("/api/flash-sale", FlashSaleRouter);
};
