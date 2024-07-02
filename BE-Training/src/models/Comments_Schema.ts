import { IComment } from '@/types/Comment_Interface';
import { Schema, model } from "mongoose";

const commentSchema: Schema<IComment> = new Schema({
    _id: { type: Schema.Types.ObjectId, required: true },
    user_Id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    comment: { type: String, required: true, trim: true },
    replies: [{ type: String, ref: 'Comment' }]
}, { timestamps: true })

const Comment = model<IComment>('Comment', commentSchema);

export default Comment