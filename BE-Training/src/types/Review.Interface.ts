import { ObjectId } from "mongodb";
import { IComment } from "./Comment_Interface";
import { IUser } from "./User_Interface";

export interface IReview {
    _id: ObjectId,
    user_id: IUser["_id"],
    product_id: ObjectId,
    comment: [IComment]
    startRating: number
}