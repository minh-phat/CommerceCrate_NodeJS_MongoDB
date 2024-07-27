import { BUY_QUANTITY_1 } from "@/constant/Cart_Constant";
import { ICart } from "@/types/Cart_Interface";
import { Schema, model } from "mongoose";

const cartSchema: Schema<ICart> = new Schema({
	// _id: {
	// 	type: Schema.Types.ObjectId,
	// 	required: true,
	// },
	user_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
	product_id: {
		type: Schema.Types.ObjectId,
		ref: "Product",
		required: true,
	},
	quantity: {
		type: Number,
		required: true,
		default: BUY_QUANTITY_1,
	},
});

const Cart = model<ICart>("Cart", cartSchema);

export default Cart;
