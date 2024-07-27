import { Router, Request, Response } from 'express';

import { getShopPage, createShop, updateShop, viewShop, deleteShop} from '@/controllers/Shops_Controller';
import { Shop_Validate_Create, Shop_Validate_Update ,Shop_Validate } from '@/validates/Shop_Validate';
import { body, validationResult } from "express-validator";

const router = Router();

router.post("/add-shop",  Shop_Validate_Create , createShop);
router.post("/update-shop/:id", Shop_Validate_Update,updateShop);
router.delete("/delete-shop/:id", deleteShop);
router.get("/view-shop/:id", viewShop );


export default router;