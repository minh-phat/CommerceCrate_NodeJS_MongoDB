import { Schema, model } from "mongoose";
import { IReview } from "@/types/Review.Interface";
import { STAR_RATING_3 } from "@/constant/Review_Constant";

const reviewSchema: Schema<IReview> = new Schema({
    _id: { type: Schema.Types.ObjectId, required: true },
    user_id: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    product_id: { type: Schema.Types.ObjectId, required: true, ref: "Product" },
    comment: [{ type: String, ref: "Comment" }],
    startRating: { type: Number, required: true, default: STAR_RATING_3 }
}, {
    timestamps: true
})

const Review = model<IReview>("Review", reviewSchema)

export default Review