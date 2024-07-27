import { ObjectId } from "mongodb";
// import { IUser } from "./User_Interface";

export interface IComment {
  _id: ObjectId;
  user_id: ObjectId;
  comment: string;
  comment_lv1: IComment[];
  comment_lv2: IComment[];
  comment_lv3: IComment[];
  images: string[];
  replyToReview?: ObjectId;
}
