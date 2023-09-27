
import { Request } from "express";
import fileUpload from "express-fileupload";
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

export const subirArchivo = (files: fileUpload.UploadedFile | fileUpload.UploadedFile[], extensionesValidas = ['png', 'jpg', 'jpeg', 'gif'], carpeta = '') => {
  return new Promise<string[]>((resolve, reject) => { // Specify the return type as an array of strings
    const archivos = Array.isArray(files) ? files : [files];

    if (archivos.length === 0) {
      return reject('No se recibieron archivos');
    }

    const resultados: string[] = []; // Specify the type as an array of strings

    archivos.forEach((archivo) => {
      const nombreCortado = archivo.name.split('.');
      const extension = nombreCortado[nombreCortado.length - 1];

      if (!extensionesValidas.includes(extension)) {
        return reject(`La extensión ${extension} no es permitida - ${extensionesValidas}`);
      }

      const nombreTemp = uuidv4() + '.' + extension;
      const uploadPath = path.join(__dirname, '../uploads/', carpeta, nombreTemp);

      archivo.mv(uploadPath, (err: Error) => {
        if (err) {
          return reject(err);
        }
        resultados.push(nombreTemp);

        if (resultados.length === archivos.length) {
          resolve(resultados);
        }
      });
    });
  });
}
