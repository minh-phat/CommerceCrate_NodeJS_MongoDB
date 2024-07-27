import { Object_Validate } from "@/utils/Check_ObjectId";
import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";

const Shop_Validate = () => [
    body('name')
        .notEmpty()
        .isString()
        .withMessage('Please enter a valid name'),
    body('status')
        .notEmpty()
        .isString()
        .withMessage('Please enter a valid status'),
    body('address')
        .isString()
        .withMessage('Please enter a valid address'),
];

const Shop_Validate_Create =  [
	...Shop_Validate(),
	(req: Request, res: Response, next: NextFunction) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}else{
			next();
		}
	},
];
const Shop_Validate_Update = [
	...Shop_Validate(),
	(req: Request, res: Response, next: NextFunction) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}else{
			next();
		}
	},
];

export {  Shop_Validate_Create, Shop_Validate_Update, Shop_Validate };
