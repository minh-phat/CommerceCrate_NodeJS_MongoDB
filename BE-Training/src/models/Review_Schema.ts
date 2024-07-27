import { STAR_RATING_3 } from "@/constant/Review_Constant";
import { IReview } from "@/types/Review_Interface";
import { Schema, model } from "mongoose";

const reviewSchema: Schema<IReview> = new Schema(
	{
		_id: { type: Schema.Types.ObjectId, required: true },
		user_id: { type: Schema.Types.ObjectId, required: true, ref: "Users" },
		product_id: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: "Products",
		},
		comment: { type: String, required: true },
		images: { type: [String], required: true },
		comments_id: {
			type: [Schema.Types.ObjectId],
			required: true,
			ref: "Comments",
		},
		startRating: { type: Number, required: true, default: STAR_RATING_3 },
	},
	{
		timestamps: true,
	}
);

const Review = model<IReview>("Review", reviewSchema);

export default Review;
