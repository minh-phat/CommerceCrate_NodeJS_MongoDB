// import { Interface } from "readline";

// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;

import { Schema, model } from "mongoose";
import { IShop} from "../types/Shops_Interface";
  
const ShopsSchema = new Schema<IShop>({
    _id: Schema.Types.ObjectId,
    name: { type: String, required: true },
    status: { type: String, required: true },
    images: { type: [String], default: [], required: true},
}, {timestamps: true}); 

const ShopsModel = model<IShop>("Shops", ShopsSchema);

export default ShopsModel;


