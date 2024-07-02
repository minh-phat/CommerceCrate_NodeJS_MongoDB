import { ObjectId } from "mongodb";
import { IUser } from "./User_Interface";

export interface IComment {
    _id: ObjectId,
    user_Id: IUser["_id"],
    comment_Id: IComment["_id"],
    comment: string,
    image: string,
    replies?: IComment[];
}