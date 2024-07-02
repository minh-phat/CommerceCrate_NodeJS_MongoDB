import { ObjectId } from "mongodb";
import { IUser } from "./User_Interface";

export interface IAddresses {
    _id: ObjectId,
    userId: IUser["_id"],
    buyer_address: string,
    buyer_name: string,
    buyer_phone_number: string,
}