import { ObjectId } from "mongodb";

export interface IShop {
  _id: ObjectId;
  name: string;
  status: string;
  address?: string;
  logo_image: string;
  payment_id?: ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}
