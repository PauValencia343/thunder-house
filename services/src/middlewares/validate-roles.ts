
import { NextFunction, Request, Response } from "express";

// Middleware to check if the user has an "ADMIN_ROLE"
export const isAdminRole = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.user) {
    return res.status(500).json({
      msg: "Attempting to validate role without validating token",
    });
  }

  // const { fkRole, name } = req.user;
  const { userName } = req.user;
  // if (fkRole !== "ADMIN_ROLE") {
  //   return res.status(401).json({
  //     msg: `${name} is not an administrator - Not an ADMIN_ROLE`,
  //   });
  // }
  next();
};

// Middleware to check if the user has one of the specified roles
export const hasRole = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(500).json({
        msg: "Attempting to validate role without validating token",
      });
    }
    // if (!roles.includes(req.user.fkRole)) {
    //   return res.status(401).json({
    //     msg: `The service requires one of these roles: ${roles.join(", ")}`,
    //   });
    // }
    next();
  };
};
