import { ObjectId } from "mongodb";

export interface IFlashSale {
  _id: ObjectId;
  start_time: Date;
  end_time: Date;
  name?: string;
  description?: string;
  status: string;
}