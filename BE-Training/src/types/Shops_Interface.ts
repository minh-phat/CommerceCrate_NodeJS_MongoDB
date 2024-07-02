import { ObjectId } from 'mongodb';

export interface IShop {
    _id: ObjectId,
    name: string,
    status: string,
    images: string[],
    createdAt?: Date;
    updatedAt?: Date;
}