
import { Request, Response } from "express";

import {
  CatEquipmentEntity, DetailEquipmentRoomTypeEntity,
} from "../../entity";


export const equipmentGet = async (req: Request, res: Response) => {
  try {
    const { id_cat_equipment } = req.params;
    const equipmentFound = await CatEquipmentEntity.findOne({
      where: {
        id_cat_equipment: parseInt(id_cat_equipment),
        status: true,
      },
    });
    return res.status(200).json({
      equipment: equipmentFound,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: 'Internal server error',
    });
  }
};

export const equipmentGetAll = async (req: Request, res: Response) => {
  const { limit = 10, page = 1 } = req.query;
  const parsedPage = parseInt(page as string, 10);
  const parsedLimit = parseInt(limit as string, 10);
  const skip = (parsedPage - 1) * parsedLimit;
  try {
    const list: CatEquipmentEntity[] = await CatEquipmentEntity.find({
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

export const equipmentPut = async (req: Request, res: Response) => {
  const { id_cat_equipment } = req.params;
  const {
    equipment,
    total_number_people,
    status
  } = req.body;
  try {
    const equipmentFound = await CatEquipmentEntity.findOneBy({
      id_cat_equipment: parseInt(id_cat_equipment),
    });
    equipmentFound!.equipment = equipment;
    equipmentFound!.total_number_people = total_number_people;
    equipmentFound!.status = status;
    await equipmentFound!.save();
    return res.status(200).json({
      equipment: equipmentFound,
    });
  } catch (error) {
    console.error("Error updating equipment:", error);
    res.status(500).json({ msg: "Internal server error" });
  }
};

export const equipmentPost = async (req: Request, res: Response) => {
  const { equipment, total_number_people } = req.body;
  try {
    const newEquipment = new CatEquipmentEntity();
    newEquipment.equipment = equipment;
    newEquipment.total_number_people = total_number_people;
    await newEquipment.save();
    return res.status(200).json({
      equipment: newEquipment,
    });
  } catch (error) {
    return res.status(500).json({
      error: "An error occurred while creating the equipment.",
    });
  }
};

export const equipmentDelete = async (req: Request, res: Response) => {
  const { id_cat_equipment } = req.params;
  try {
    const equipmentFound = await CatEquipmentEntity.findOne({
      where: {
        id_cat_equipment: parseInt(id_cat_equipment),
      },
    });
    equipmentFound!.status = false;
    await equipmentFound!.save();
    return res.status(200).json({
      equipment: equipmentFound
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const equipmentDeletePhysical = async (req: Request, res: Response) => {
  const { id_cat_equipment } = req.params;
  try {
    const equipmentFound = await CatEquipmentEntity.findOne({
      where: {
        id_cat_equipment: parseInt(id_cat_equipment),
      },
    });
    const foundDetailEquipmentRoomTypeEntity = await DetailEquipmentRoomTypeEntity.findBy({
      equipments: !equipmentFound
    });
    for (const item of foundDetailEquipmentRoomTypeEntity) {
      await item.remove();
    }
    await equipmentFound!.remove()
    return res.status(200).json({
      equipment: equipmentFound
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
