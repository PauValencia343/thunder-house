
import { NextFunction, Request, Response } from "express";

export const esAdminRole = (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) {
    return res.status(500).json({
      msg: 'Se quiere validar rol sin validar token'
    });
  }

  const { rol, nombre } = req.user;
  if (rol !== 'ADMIN_ROLE') {
    return res.status(401).json({
      msg: `${nombre} No es administrador - No es ADMIN_ROLE`
    });
  }
  next();
}

export const tieneRole = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(500).json({
        msg: 'Se quiere validar rol sin validar token'
      });
    }
    if (!roles.includes(req.user.rol)) {
      return res.status(401).json({
        msg: `El servicio requiere uno de estos roles ${roles}`
      });
    }
    next();
  }
}
