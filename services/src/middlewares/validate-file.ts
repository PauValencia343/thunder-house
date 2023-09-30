
import { NextFunction, Request, Response } from "express";

// Middleware to validate if a file is included in the request
export const validateFileUpload = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
    return res.status(400).json({
      msg: "No files to upload - validate file",
    });
  }
  next();
};
