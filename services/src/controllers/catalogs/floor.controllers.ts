
import { Request, Response } from "express";

import {
  CatFloorEntity, CatRoomEntity, DetailRoleFloorEntity,
} from "../../entity";


export const floorGet = async (req: Request, res: Response) => {
  try {
    const { id_cat_floor } = req.params;
    const floorFound = await CatFloorEntity.findOne({
      where: {
        id_cat_floor: parseInt(id_cat_floor),
        status: true,
      },
    });
    return res.status(200).json({
      floor: floorFound,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: 'Internal server error',
    });
  }
};

export const floorGetAll = async (req: Request, res: Response) => {
  const { limit = 10, page = 1 } = req.query;
  const parsedPage = parseInt(page as string, 10);
  const parsedLimit = parseInt(limit as string, 10);
  const skip = (parsedPage - 1) * parsedLimit;
  try {
    const list: CatFloorEntity[] = await CatFloorEntity.find({
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

export const floorPut = async (req: Request, res: Response) => {
  const { id_cat_floor } = req.params;
  const {
    number,
    name,
    status
  } = req.body;
  try {
    const floorFound = await CatFloorEntity.findOne({
      where: {
        id_cat_floor: parseInt(id_cat_floor),
      },
    });
    floorFound!.number = number;
    floorFound!.name = name;
    floorFound!.status = status;
    await floorFound!.save();
    return res.status(200).json({
      floor: floorFound,
    });
  } catch (error) {
    console.error("Error updating floor:", error);
    res.status(500).json({ msg: "Internal server error" });
  }
};

export const floorPost = async (req: Request, res: Response) => {
  const { number, name } = req.body;
  try {
    const newFloor = new CatFloorEntity();
    newFloor.number = number;
    newFloor.name = name;
    await newFloor.save();
    return res.status(200).json({
      floor: newFloor,
    });
  } catch (error) {
    return res.status(500).json({
      error: "An error occurred while creating the floor.",
    });
  }
};

export const floorDelete = async (req: Request, res: Response) => {
  const { id_cat_floor } = req.params;
  try {
    const floorFound = await CatFloorEntity.findOne({
      where: {
        id_cat_floor: parseInt(id_cat_floor),
      },
    });
    floorFound!.status = false;
    await floorFound!.save();
    return res.status(200).json({
      floor: floorFound
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const floorDeletePhysical = async (req: Request, res: Response) => {
  const { id_cat_floor } = req.params;
  try {
    const floorFound = await CatFloorEntity.findOne({
      where: {
        id_cat_floor: parseInt(id_cat_floor),
      },
    });
    const foundDetailRoleFloorEntity = await DetailRoleFloorEntity.findBy({
      floors: !floorFound
    });
    for (const item of foundDetailRoleFloorEntity) {
      await item.remove();
    }
    const foundCatRoomEntity = await CatRoomEntity.findBy({
      fkCatFloorEntity: !floorFound
    });
    for (const item of foundCatRoomEntity) {
      await item.remove();
    }
    await floorFound!.remove();
    return res.status(200).json({
      floor: floorFound
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
