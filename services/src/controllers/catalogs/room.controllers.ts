
import { Request, Response } from "express";

import {
  CatFloorEntity,
  CatRoomEntity,
  CatRoomStatusEntity,
  CatRoomTypeEntity,
} from "../../entity";


export const roomGet = async (req: Request, res: Response) => {
  try {
    const { id_cat_room } = req.params;
    const roomFound = await CatRoomEntity.findOne({
      where: {
        id_cat_room: parseInt(id_cat_room),
        status: true,
      },
    });
    return res.status(200).json({
      room: roomFound,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: 'Internal server error',
    });
  }
};

export const roomGetAll = async (req: Request, res: Response) => {
  const { limit = 10, page = 1 } = req.query;
  const parsedPage = parseInt(page as string, 10);
  const parsedLimit = parseInt(limit as string, 10);
  const skip = (parsedPage - 1) * parsedLimit;
  try {
    const list: CatRoomEntity[] = await CatRoomEntity.find({
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

export const roomPut = async (req: Request, res: Response) => {
  const { id_cat_room } = req.params;
  const {
    number,
    name,
    status,
    fk_cat_floor,
    fk_cat_room_status,
    fk_cat_room_type,
  } = req.body;
  try {
    const roomFound = await CatRoomEntity.findOne({
      where: {
        id_cat_room: parseInt(id_cat_room),
      },
    });
    roomFound!.number = number;
    roomFound!.name = name;
    roomFound!.status = status;
    const floorFound = await CatFloorEntity.findOne({
      where: {
        id_cat_floor: fk_cat_floor,
        status: true,
      },
    });
    roomFound!.fkCatFloorEntity = floorFound!;
    const roomStatusFound = await CatRoomStatusEntity.findOne({
      where: {
        id_cat_room_status: fk_cat_room_status,
        status: true,
      },
    });
    roomFound!.fkCatRoomStatusEntity = roomStatusFound!;
    const roomTypeFound = await CatRoomTypeEntity.findOne({
      where: {
        id_cat_room_type: fk_cat_room_type,
        status: true,
      },
    });
    roomFound!.fkCatRoomTypeEntity = roomTypeFound!;
    
    await roomFound!.save();
    return res.status(200).json({
      room: roomFound,
    });
  } catch (error) {
    console.error("Error updating room:", error);
    res.status(500).json({ msg: "Internal server error" });
  }
};

export const roomPost = async (req: Request, res: Response) => {
  const {
    number,
    name,
    fk_cat_floor,
    fk_cat_room_status,
    fk_cat_room_type,
  } = req.body;
  try {
    const newRoom = new CatRoomEntity();
    newRoom.number = number;
    newRoom.name = name;
    const floorFound = await CatFloorEntity.findOne({
      where: {
        id_cat_floor: fk_cat_floor,
        status: true,
      },
    });
    newRoom.fkCatFloorEntity = floorFound!;
    const roomStatusFound = await CatRoomStatusEntity.findOne({
      where: {
        id_cat_room_status: fk_cat_room_status,
        status: true,
      },
    });
    newRoom.fkCatRoomStatusEntity = roomStatusFound!;
    const roomTypeFound = await CatRoomTypeEntity.findOne({
      where: {
        id_cat_room_type: fk_cat_room_type,
        status: true,
      },
    });
    newRoom.fkCatRoomTypeEntity = roomTypeFound!;
    await newRoom.save();
    return res.status(200).json({
      room: newRoom,
    });
  } catch (error) {
    return res.status(500).json({
      error: "An error occurred while creating the room.",
    });
  }
};

export const roomDelete = async (req: Request, res: Response) => {
  const { id_cat_room } = req.params;
  try {
    const roomFound = await CatRoomEntity.findOne({
      where: {
        id_cat_room: parseInt(id_cat_room),
      },
    });
    roomFound!.status = false;
    await roomFound!.save();
    return res.status(200).json({
      room: roomFound
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};


export const roomDeletePhysical = async (req: Request, res: Response) => {
  const { id_cat_room } = req.params;
  try {
    const roomFound = await CatRoomEntity.findOne({
      where: {
        id_cat_room: parseInt(id_cat_room),
      },
    });
    await roomFound!.remove();
    return res.status(200).json({
      room: roomFound
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
