
import { Request, Response } from "express";
import bcryptjs from "bcryptjs";

import RoleModel from "../models/database/role.models";


// Handler for getting a list of roles
export const roleGet = async (req: Request, res: Response) => {
  const { limit = 10, page = 1 } = req.query;
  const parsedPage = parseInt(page as string, 10);
  const parsedLimit = parseInt(limit as string, 10);
  const offset = (parsedPage - 1) * parsedLimit;
  const query = { status: true };
  try {
    // Find and count all roles that meet the query criteria
    const roles = await RoleModel.findAndCountAll({
      where: query,
      limit: parseInt(limit as string),
      offset: offset,
    });
    return res.json({ roles });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Internal server error"
    });
  }
};

// Handler for updating a role
export const rolePut = async (req: Request, res: Response) => {
  const { uuid } = req.params;
  const { role } = req.body;
  try {
    const roleFound = await RoleModel.findByPk(uuid);
    if (!roleFound) {
      return res.status(404).json({ msg: "Role not found" });
    }
    await roleFound.update({
      role
    });
    const updatedRole = await RoleModel.findByPk(uuid);
    res.json(updatedRole);
  } catch (error) {
    console.error("Error updating role:", error);
    res.status(500).json({ msg: "Internal server error" });
  }
};

// Handler for creating a new role
export const rolePost = async (req: Request, res: Response) => {
  const { role } = req.body;
  const newRole = new RoleModel({
    role,
  });
  await newRole.save();
  return res.status(200).json({
    role: newRole,
  });
};

// Handler for soft-deleting a role
export const roleDelete = async (req: Request, res: Response) => {
  const { uuid } = req.params;
  try {
    const role = await RoleModel.findOne({ where: { uuid } });
    if (!role) {
      return res.status(404).json({ error: "Role not found" });
    }
    await role.update({ status: false });
    return res.json({ user: role });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
