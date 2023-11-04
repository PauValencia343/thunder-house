
import { Request, Response } from "express";

import { 
  CatFloorEntity,
  CatRoomEntity,
  CatRoomStatusEntity,
} from "../../entity";


export const changeRoomStatus = async (req: Request, res: Response) => {
  const { id_cat_room } = req.params;
  const {
    id_cat_room_status,
  }: {
    id_cat_room_status: number,
  } = req.body;
  try {
    const roomFound = await CatRoomEntity.findOne({
      where: {
        id_cat_room: parseInt(id_cat_room),
        status: true,
      },
    });
    const roomStatusFound = await CatRoomStatusEntity.findOne({
      where: {
        id_cat_room_status,
        status: true,
      },
    });
    roomFound!.cat_room_status = roomStatusFound!;
    await roomFound!.save();
    return res.status(200).json({
      room: roomFound,
    });
  } catch (error) {
    console.error("Internal server error:", error);
    res.status(500).json({ msg: "Internal server error" });
  }
};


export const getRoomsByFloor = async (req: Request, res: Response) => {
  const { id_cat_floor } = req.params;
  try {
    const roomsFound = await CatRoomEntity.findBy({
      status: true,
      cat_floor: {
        id_cat_floor: parseInt(id_cat_floor),
        status: true,
      },
    });
    return res.status(200).json({
      rooms: roomsFound,
    });
  } catch (error) {
    console.error("Internal server error:", error);
    res.status(500).json({ msg: "Internal server error" });
  }
};
