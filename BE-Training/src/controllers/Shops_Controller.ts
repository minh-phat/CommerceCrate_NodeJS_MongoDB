import {  Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';
import   ShopsModel  from '@/models/Shops_Schema';
import { error } from 'console';

const currentFile = __filename;

export const getShopPage = (req: Request, res: Response): void => {
    res.send('hi');
};
export const viewShop = async (req: Request, res: Response)=> {
    const shop_id = req.params.id;
    try{
        const foundUser = await ShopsModel.findById(shop_id)
        if (!foundUser) {
            res.status(400).json({message: "Shop not found"});
            return;
        }
        res.status(200).json({foundUser})
    }catch(error){
        res.status(400).json({error: error, errorFilePath: currentFile});
        return; 
    }
   

};
export const updateShop = async (req: Request, res: Response) => {
    const shop_id = req.params.id;
    const name = req.body.name;
    const status = req.body.status;
    const logo_image = req.body.logo_image;
    const address = req.body.address;

    const ShopObjectId = new ObjectId(shop_id);

    await ShopsModel.findByIdAndUpdate({ _id: ShopObjectId },
        { $set: 
            {   
                name: name,
                address: address,
                status: status,
                logo_image: logo_image,
            }
        }
    )
    .then(updatedShop => {
        if (updatedShop) {
            res.status(200).json({message: "Update Shopp successfully"});
        } else {
            res.status(400).json({message: "Shop not found"});
        }
    })
    .catch(error => {
        res.status(400).json({error: error, errorFilePath: currentFile});
    });

};
export const createShop = async (req: Request, res: Response) => {
    const name = req.body.name;
    const image = req.body.logo_image;
    const address = req.body.address;

    const newShop = new ShopsModel({
        _id: new ObjectId(),
        name: name,
        address: address,
        status: 'Open',
        logo_image: image,
    });


    try {
        const savedShop = await newShop.save();      
        res.status(200).json({message:"add user successfully", data: savedShop})
        console.log('User added:', savedShop );
      } catch (error) {
        res.status(400).json({error: error, erroFilePath: currentFile})
      }
}
export const deleteShop = (req:Request, res:Response) => {
    const shop_id = req.params.id;
    const ShopObjectId = new ObjectId(shop_id)
    ShopsModel.findByIdAndDelete(ShopObjectId)
       .then(deletedShop => {
            if (deletedShop) {
                res.status(200).json({message: "Delete Shop successfully"});
            } else {
                res.status(400).json({message: "Shop not found"});
            }
        })
       .catch(error => {
            res.status(400).json({error: error, errorFilePath: currentFile});
        });
}