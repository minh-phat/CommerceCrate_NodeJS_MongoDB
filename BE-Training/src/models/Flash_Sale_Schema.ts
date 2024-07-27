import { BUY_QUANTITY_1 } from "@/constant/Cart_Constant";
import { IFlashSale } from "@/types/Flash_Sale_Interface";
import { Schema, model } from "mongoose";

const flashSaleSchema: Schema<IFlashSale> = new Schema({

	start_time: { type: Date, required: true },
	end_time: { type: Date, required: true},
    name: { type: String},
    description: { type: String},
    status: { type: String},
});

const FlashSaleModel = model<IFlashSale>("FlashSale", flashSaleSchema);

export default FlashSaleModel;
