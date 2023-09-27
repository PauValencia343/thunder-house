
import { NextFunction, Request, Response } from "express";

export const validarArchivoSubir = (req: Request, res: Response, next: NextFunction) => {
  if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
    return res.status(400).json({
      msg: 'No hay archivos que subir - validar archivo'
    });
  }
  next();
}
