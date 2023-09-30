
import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

// Middleware to validate request fields using express-validator
export const validateFields = ( req: Request, res: Response, next: NextFunction ) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors.array());
  }
  // Allow the request to proceed to the next middleware if there are no validation errors
  next();
};
