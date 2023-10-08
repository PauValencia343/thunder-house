
import { Request, Response } from "express";

import {
  RoleEntity,
} from "../entity";


export const roleGet = async (req: Request, res: Response) => {
  try {
    const { uuid } = req.params;
    const roleFound = await RoleEntity.findOneBy({
      uuid,
    });
    return res.status(200).json({
      role: roleFound,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: 'Internal server error',
    });
  }
};

export const roleGetAll = async (req: Request, res: Response) => {
  const { limit = 10, page = 1 } = req.query;
  const parsedPage = parseInt(page as string, 10);
  const parsedLimit = parseInt(limit as string, 10);
  const skip = (parsedPage - 1) * parsedLimit;
  try {
    const [list, count] = await Promise.all([
      RoleEntity.find({
        skip,
        take: parsedLimit,
      }),
      RoleEntity.count(),
    ]);
    return res.status(200).json({
      list, count
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: 'Internal server error',
    });
  }
};

export const rolePut = async (req: Request, res: Response) => {
  const { uuid } = req.params;
  const { role, status = null } = req.body;
  try {
    const roleFound = await RoleEntity.findOneBy({
      uuid
    });
    roleFound!.role = role;
    roleFound!.assignStatus(status);
    await roleFound!.save();
    return res.status(200).json({
      role: roleFound,
    });
  } catch (error) {
    console.error("Error updating role:", error);
    res.status(500).json({ msg: "Internal server error" });
  }
};

export const rolePost = async (req: Request, res: Response) => {
  const { role } = req.body;
  try {
    const newRole = new RoleEntity();
    newRole.role = role;
    await newRole.save();
    return res.status(200).json({
      role: newRole,
    });
  } catch (error) {
    return res.status(500).json({
      error: "An error occurred while creating the role.",
    });
  }
};

export const roleDelete = async (req: Request, res: Response) => {
  const { uuid } = req.params;
  try {
    const roleFound = await RoleEntity.findOne({ where: { uuid } });
    roleFound!.status = false;
    await roleFound!.save();
    return res.status(200).json({
      role: roleFound
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
