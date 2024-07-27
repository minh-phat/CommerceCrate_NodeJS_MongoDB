import { IComment } from "@/types/Comment_Interface";
import { Schema, model } from "mongoose";

const commentSchema: Schema<IComment> = new Schema(
	{
		_id: { type: Schema.Types.ObjectId, required: true },
		user_id: { type: Schema.Types.ObjectId, ref: "Users" },
		comment: { type: String, required: true, trim: true },
		comment_lv1: { type: [String] },
		comment_lv2: { type: [String] },
		comment_lv3: { type: [String] },
		images: { type: [String], required: true, trim: true },
		replyToReview: { type: Schema.Types.ObjectId, ref: "Reviews" },
	},
	{ timestamps: true }
);

const Comment = model<IComment>("Comment", commentSchema);

export default Comment;
