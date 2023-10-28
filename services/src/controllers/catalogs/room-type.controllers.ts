
import { Request, Response } from "express";

import {
  CatEquipmentEntity,
  CatRoomEntity,
  CatRoomTypeEntity,
  CatSupplieEntity,
  DetailEquipmentRoomTypeEntity,
  DetailSupplieRoomTypeEntity,
} from "../../entity";
import AppDataSource from "../../database/config";


export const roomTypeGet = async (req: Request, res: Response) => {
  try {
    const { id_cat_room_type } = req.params;
    const roomTypeFound = await CatRoomTypeEntity.findOne({
      where: {
        id_cat_room_type: parseInt(id_cat_room_type),
        status: true,
      },
    });
    return res.status(200).json({
      roomType: roomTypeFound,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: 'Internal server error',
    });
  }
};

export const roomTypeGetAll = async (req: Request, res: Response) => {
  const { limit = 10, page = 1 } = req.query;
  const parsedPage = parseInt(page as string, 10);
  const parsedLimit = parseInt(limit as string, 10);
  const skip = (parsedPage - 1) * parsedLimit;
  try {
    const list: CatRoomTypeEntity[] = await CatRoomTypeEntity.find({
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

export const roomTypePut = async (req: Request, res: Response) => {
  const { id_cat_room_type } = req.params;
  const {
    room_type,
    status,
    supplies,
    equipments,
  }: {
    room_type: string;
    status: boolean;
    supplies: { id_supplie: string; total_supplies: number }[];
    equipments: { id_equipment: string; total_equipments: number }[];
  } = req.body;
  try {
    const roomTypeFound = await CatRoomTypeEntity.findOne({
      where: {
        id_cat_room_type: parseInt(id_cat_room_type),
      },
    });
    const foundDetailSupplieRoomTypeEntity = await DetailSupplieRoomTypeEntity.findBy({
      roomTypes: !roomTypeFound
    });
    const foundDetailEquipmentRoomTypeEntity = await DetailEquipmentRoomTypeEntity.findBy({
      roomTypes: !roomTypeFound
    });
    for (const item of foundDetailSupplieRoomTypeEntity) {
      await item.remove();
    }
    for (const item of foundDetailEquipmentRoomTypeEntity) {
      await item.remove();
    }

    roomTypeFound!.room_type = room_type;
    roomTypeFound!.status = status;

    for (const supplie of supplies) {
      const newDetailSupplieRoomTypeEntity = new DetailSupplieRoomTypeEntity();
      newDetailSupplieRoomTypeEntity.total_supplies = supplie.total_supplies;
      const supplieFound = await CatSupplieEntity.findOne({
        where: {
          id_cat_supplie: parseInt(supplie.id_supplie),
          status: true,
        },
      });
      newDetailSupplieRoomTypeEntity.supplies = supplieFound!;
      newDetailSupplieRoomTypeEntity.roomTypes = roomTypeFound!;
      await newDetailSupplieRoomTypeEntity.save();
    }
    for (const equipment of equipments) {
      const newDetailEquipmentRoomTypeEntity = new DetailEquipmentRoomTypeEntity();
      newDetailEquipmentRoomTypeEntity.total_equipments = equipment.total_equipments;
      const equipmentFound = await CatEquipmentEntity.findOne({
        where: {
          id_cat_equipment: parseInt(equipment.id_equipment),
          status: true,
        },
      });
      newDetailEquipmentRoomTypeEntity.equipments = equipmentFound!;
      newDetailEquipmentRoomTypeEntity.roomTypes = roomTypeFound!;
      await newDetailEquipmentRoomTypeEntity.save();
    }
    await roomTypeFound!.save();
    return res.status(200).json({
      roomType: roomTypeFound,
    });
  } catch (error) {
    console.error("Error updating roomType:", error);
    return res.status(500).json({ msg: "Internal server error" });
  }
};



export const roomTypePost = async (req: Request, res: Response) => {
  const {
    room_type,
    supplies,
    equipments,
  }: {
    room_type: string;
    supplies: { id_supplie: string; total_supplies: number }[];
    equipments: { id_equipment: string; total_equipments: number }[];
  } = req.body;
  try {
    const newRoomType = new CatRoomTypeEntity();
    newRoomType.room_type = room_type;
    await newRoomType.save();
    for (const supplie of supplies) {
      const newDetailSupplieRoomTypeEntity = new DetailSupplieRoomTypeEntity();
      newDetailSupplieRoomTypeEntity.total_supplies = supplie.total_supplies;
      const supplieFound = await CatSupplieEntity.findOne({
        where: {
          id_cat_supplie: parseInt(supplie.id_supplie),
          status: true,
        },
      });
      newDetailSupplieRoomTypeEntity.supplies = supplieFound!;
      newDetailSupplieRoomTypeEntity.roomTypes = newRoomType;
      await newDetailSupplieRoomTypeEntity.save();
    }
    for (const equipment of equipments) {
      const newDetailEquipmentRoomTypeEntity = new DetailEquipmentRoomTypeEntity();
      newDetailEquipmentRoomTypeEntity.total_equipments = equipment.total_equipments;
      const equipmentFound = await CatEquipmentEntity.findOne({
        where: {
          id_cat_equipment: parseInt(equipment.id_equipment),
          status: true,
        },
      });
      newDetailEquipmentRoomTypeEntity.equipments = equipmentFound!;
      newDetailEquipmentRoomTypeEntity.roomTypes = newRoomType;
      await newDetailEquipmentRoomTypeEntity.save();
    }
    return res.status(200).json({
      roomType: newRoomType,
    });
  } catch (error) {
    return res.status(500).json({
      error: "An error occurred while creating the roomType.",
    });
  }
};

export const roomTypeDelete = async (req: Request, res: Response) => {
  const { id_cat_room_type } = req.params;
  try {
    const roomTypeFound = await CatRoomTypeEntity.findOne({
      where: {
        id_cat_room_type: parseInt(id_cat_room_type),
      },
    });
    roomTypeFound!.status = false;
    await roomTypeFound!.save();
    return res.status(200).json({
      roomType: roomTypeFound
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const roomTypeDeletePhysical = async (req: Request, res: Response) => {
  const { id_cat_room_type } = req.params;
  try {
    const roomTypeFound = await CatRoomTypeEntity.findOne({
      where: {
        id_cat_room_type: parseInt(id_cat_room_type),
      },
    });
    const foundDetailEquipmentRoomTypeEntity = await DetailEquipmentRoomTypeEntity.findBy({
      roomTypes: !roomTypeFound
    });
    for (const item of foundDetailEquipmentRoomTypeEntity) {
      await item.remove();
    }
    const foundDetailSupplieRoomTypeEntity = await DetailSupplieRoomTypeEntity.findBy({
      roomTypes: !roomTypeFound
    });
    for (const item of foundDetailSupplieRoomTypeEntity) {
      await item.remove();
    }
    const foundCatRoomEntity = await CatRoomEntity.findBy({
      fkCatRoomTypeEntity: !roomTypeFound
    });
    for (const item of foundCatRoomEntity) {
      await item.remove();
    }
    await roomTypeFound!.remove();
    return res.status(200).json({
      roomType: roomTypeFound
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
