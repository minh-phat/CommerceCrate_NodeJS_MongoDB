import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";
import dayjs from "dayjs"

const Flash_Sale_Validate = () => [
    body('name')
		.optional() // Allow 'name' field to be left blank
        .isString()
        .withMessage('Please enter a valid name'),
    body('description')
		.optional() // Allow 'descripton' field to be left blank
        .isString()
        .withMessage('Please enter a valid description'),
    body('start_time')
        .notEmpty() // Check it is not empty
		.withMessage('Do not leave data empty')
		.bail() //if previous function work , the following functions will stop 
        .isISO8601()
        .withMessage('Please enter a valid start time'),
    body('end_time')
        .notEmpty()
		.withMessage('Do not leave data empty')
		.bail()//if previous function work , the following functions will stop
        .isISO8601()
        .withMessage('Please enter a valid end time')
		.bail() //if previous function work , the following functions will stop 
		.custom((value, { req }) => {
            const startTime = dayjs(req.body.start_time);
            const endTime = dayjs(value);						// check "end time" must be the time after "start time" 
            if (!startTime.isBefore(endTime)) {
                throw new Error('End time must be after start time');
            }
			return true;          
        })
		
];

const Flash_Sale_Validate_Create =  [
	...Flash_Sale_Validate(),
	(req: Request, res: Response, next: NextFunction) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors1: errors.array() });
		}else{
			next();
		}
	},
];
const Flash_Sale_Validate_Update = [
	...Flash_Sale_Validate(),
	(req: Request, res: Response, next: NextFunction) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}else{
			next();
		}
	},
];

export {  Flash_Sale_Validate_Create, Flash_Sale_Validate_Update};
