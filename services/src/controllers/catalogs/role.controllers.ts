
import { Request, Response } from "express";

import {
  CatFloorEntity,
  CatRoleEntity, DetailRoleFloorEntity, DetailUserRoleEntity,
} from "../../entity";


export const roleGet = async (req: Request, res: Response) => {
  try {
    const { id_cat_role } = req.params;
    const roleFound = await CatRoleEntity.findOne({
      where: {
        id_cat_role: parseInt(id_cat_role),
        status: true,
      },
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
    const list: CatRoleEntity[] = await CatRoleEntity.find({
      skip,
      take: parsedLimit,
      where: {
        status: true,
      },
    });
    return res.status(200).json({
      list,
      count: list.length,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: 'Internal server error',
    });
  }
};

export const rolePut = async (req: Request, res: Response) => {
  const { id_cat_role } = req.params;
  const {
    role,
    floors,
    status,
  }: {
    role: string,
    floors: {id_floor: string}[],
    status: boolean,
  } = req.body;
  try {
    const roleFound = await CatRoleEntity.findOne({
      where: {
        id_cat_role: parseInt(id_cat_role),
      },
    });
    roleFound!.role = role;
    roleFound!.status = status;
    await roleFound!.save();
    const foundDetailRoleFloorEntity = await DetailRoleFloorEntity.findBy({
      roles: !roleFound
    });
    for (const item of foundDetailRoleFloorEntity) {
      await item.remove();
    }
    for (const floor of floors) {
      const newDetailRoleFloorEntity = new DetailRoleFloorEntity();
      const floorFound = await CatFloorEntity.findOne({
        where: {
          id_cat_floor: parseInt(floor.id_floor),
          status: true,
        },
      });
      newDetailRoleFloorEntity.roles = roleFound!;
      newDetailRoleFloorEntity.floors = floorFound!;
      await newDetailRoleFloorEntity.save();
    }
    return res.status(200).json({
      role: roleFound,
    });
  } catch (error) {
    console.error("Error updating role:", error);
    res.status(500).json({ msg: "Internal server error" });
  }
};

export const rolePost = async (req: Request, res: Response) => {
  const {
    role,
    floors,
  }: {
    role: string,
    floors: {id_floor: number}[],
  } = req.body;
  try {
    const newRole = new CatRoleEntity();
    newRole.role = role;
    await newRole.save();
    for (const floor of floors) {
      const newDetailRoleFloorEntity = new DetailRoleFloorEntity();
      const floorFound = await CatFloorEntity.findOne({
        where: {
          id_cat_floor: floor.id_floor,
          status: true,
        },
      });
      newDetailRoleFloorEntity.roles = newRole!;
      newDetailRoleFloorEntity.floors = floorFound!;
      await newDetailRoleFloorEntity.save();
    }
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
  const { id_cat_role } = req.params;
  try {
    const roleFound = await CatRoleEntity.findOne({
      where: {
        id_cat_role: parseInt(id_cat_role),
      },
    });
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

export const roleDeletePhysical = async (req: Request, res: Response) => {
  const { id_cat_role } = req.params;
  try {
    const roleFound = await CatRoleEntity.findOne({
      where: {
        id_cat_role: parseInt(id_cat_role),
      },
    });
    const foundDetailRoleFloorEntity = await DetailRoleFloorEntity.findBy({
      roles: !roleFound
    });
    for (const item of foundDetailRoleFloorEntity) {
      await item.remove();
    }
    const foundDetailUserRoleEntity = await DetailUserRoleEntity.findBy({
      roles: !roleFound
    });
    for (const item of foundDetailUserRoleEntity) {
      await item.remove();
    }
    await roleFound!.remove();

    return res.status(200).json({
      role: roleFound
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
