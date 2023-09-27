
import {
  Usuario,
  Role,
} from '../models/index';

export const esRoleValido = async (rol = '') => {
  const existeRol = await Role.findOne({ rol });
  if (!existeRol) {
    throw new Error(`El rol ${rol} no está registrado en la BD`);
  }
  return true;
}

export const emailExiste = async (correo = '') => {
  const existeEmail = await Usuario.findOne({ correo });
  if (existeEmail) {
    throw new Error(`El correo ${correo} ya fue registrado en la BD`);
  }
  return true;
}

export const existeUsuarioPorId = async (id) => {
  const existencia = await Usuario.findByPk(id);
  if (!existencia) {
    throw new Error(`El id ${id} no existe en la BD - usuario`);
  }
  return true;
}

export const coleccionesPermitidas = (coleccion = '', colecciones: string[] = []) => {
  const incluida = colecciones.includes(coleccion);
  if (!incluida) {
    throw new Error(`La colección ${coleccion} no está permitida, ${colecciones}`);
  }
  return true;
}
