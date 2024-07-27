import { Router, Request, Response } from 'express';

import { AddFlashSale, ViewAllFlashSale} from '@/controllers/Flash_Sale_Controller';
import { Flash_Sale_Validate_Create, Flash_Sale_Validate_Update } from '@/validates/Flash_Sale_Validate';
import { body, validationResult } from "express-validator";

const router = Router();

router.post("/add",  Flash_Sale_Validate_Create , AddFlashSale);
router.get("/view-all",  ViewAllFlashSale);

export default router;