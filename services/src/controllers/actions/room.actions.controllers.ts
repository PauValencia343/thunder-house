
import { Request, Response } from "express";

import { 
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
    const roomsFound: CatRoomEntity[] | null = await CatRoomEntity.find({
      relations: {
        cat_floor: true,
        cat_room_type: true,
        cat_room_status: true,
      },
      where: {
        status: true,
        cat_floor: {
          id_cat_floor: parseInt(id_cat_floor),
          status: true,
        },
      }
    });
    return res.status(200).json({
      rooms: roomsFound,
    });
  } catch (error) {
    console.error("Internal server error:", error);
    res.status(500).json({ msg: "Internal server error" });
  }
};


export const getFreeRooms = async (req: Request, res: Response) => {
  try {
    const roomsFound: CatRoomEntity[] | null = await CatRoomEntity.createQueryBuilder('cat_room')
      .leftJoinAndSelect('cat_room.cat_floor', 'cat_floor')
      .leftJoinAndSelect('cat_room.cat_room_status', 'cat_room_status')
      .leftJoinAndSelect('cat_room.cat_room_type', 'cat_room_type')
      .leftJoinAndSelect('cat_room_type.detail_equipment_room_type', 'detail_equipment_room_type')
      .leftJoinAndSelect('detail_equipment_room_type.cat_equipment', 'cat_equipment')
      .leftJoinAndSelect('cat_room_type.detail_supplie_room_type', 'detail_supplie_room_type')
      .leftJoinAndSelect('detail_supplie_room_type.cat_supplie', 'cat_supplie')
      .where(`
      cat_room.status = :status
      AND cat_floor.status = :status
      AND cat_room_status.status = :status
      AND cat_room_type.status = :status
      `, { status: true })
      .getMany();
    return res.status(200).json({
      rooms: roomsFound,
    });
  } catch (error) {
    console.error("Internal server error:", error);
    res.status(500).json({ msg: "Internal server error" });
  }
};

