import { ObjectId } from "mongodb";
// import { IComment } from "./Comment_Interface";
// import { IUser } from "./User_Interface";

export interface IReview {
  _id: ObjectId;
  user_id: ObjectId;
  product_id: ObjectId;
  comment: string;
  images: string[];
  comments_id: ObjectId[];
  startRating: number;
}
