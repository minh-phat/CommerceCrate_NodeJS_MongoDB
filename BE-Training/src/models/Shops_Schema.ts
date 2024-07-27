import { Schema, model } from "mongoose";
import { IShop } from "@/types/Shops_Interface";

export const ShopsSchema = new Schema<IShop>(
  {
    // _id: Schema.Types.ObjectId,
    name: { type: String, required: true },
    status: { type: String, required: true },
    address: { type: String},
    logo_image: { type: String},
    payment_id: { type: Schema.Types.ObjectId, ref: "Payment"},
  },
  { timestamps: true }
);

 const ShopsModel = model<IShop>("Shops", ShopsSchema);
 export default ShopsModel
