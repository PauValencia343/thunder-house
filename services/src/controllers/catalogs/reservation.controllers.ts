
import { Request, Response } from "express";

import { CatClientEntity, CatReservationEntity, CatRoomEntity, DetailReservationRoomEntity } from "../../entity";


export const reservationGet = async (req: Request, res: Response) => {
  try {
    const { id_cat_reservation } = req.params;
    const reservationFound = await CatReservationEntity.findOneBy({
      id_cat_reservation: parseInt(id_cat_reservation),
      status: true,
    });
    return res.status(200).json({
      reservation: reservationFound,
    });
  } catch (error) {
    console.error("Internal server error:", error);
    res.status(500).json({ msg: "Internal server error" });
  }
};

export const reservationGetAll = async (req: Request, res: Response) => {
  const { limit = 10, page = 1, pagination } = req.query;
  try {
    let reservationList: CatReservationEntity[] = [];
    if (pagination) {
      const parsedPage = parseInt(page as string, 10);
      const parsedLimit = parseInt(limit as string, 10);
      const skip = (parsedPage - 1) * parsedLimit;
      reservationList = await CatReservationEntity.find({
        skip,
        take: parsedLimit,
        where: {
          status: true,
        },
        relations: {
          detail_reservation_room: true,
        },
      });
    } else {
      reservationList = await CatReservationEntity.find({
        where: {
          status: true,
        },
      });
    }
    return res.status(200).json({
      list: reservationList,
      count: reservationList.length,
    });
  } catch (error) {
    console.error("Internal server error:", error);
    res.status(500).json({ msg: "Internal server error" });
  }
};

export const reservationPut = async (req: Request, res: Response) => {
  const { id_cat_reservation } = req.params;
  const {
    group_leader,
    sub_group_leader,
    fk_cat_client,
    status,
  }: {
    group_leader: string,
    sub_group_leader: string,
    fk_cat_client: number,
    status: boolean,
  } = req.body;
  try {
    const reservationFound = await CatReservationEntity.findOne({
      where: {
        id_cat_reservation: parseInt(id_cat_reservation),
      },
      relations: {
        detail_reservation_room: true,
      },
    });
    reservationFound!.group_leader = group_leader;
    reservationFound!.sub_group_leader = sub_group_leader;
    const clientFound = await CatClientEntity.findOneBy({
      id_cat_client: fk_cat_client,
    });
    reservationFound!.cat_client = clientFound!;
    reservationFound!.status = status;
    reservationFound!.save();
    return res.status(200).json({
      reservation: reservationFound,
    });
  } catch (error) {
    console.error("Internal server error:", error);
    res.status(500).json({ msg: "Internal server error" });
  }
};

export const reservationPost = async (req: Request, res: Response) => {
  const {
    group_leader,
    sub_group_leader,
    fk_cat_client,
    detail_reservation_room,
  }: {
    group_leader: string,
    sub_group_leader: string,
    fk_cat_client: number,
    detail_reservation_room: {
      fk_cat_room: number,
      total_people_booked: number,
    }[],
  } = req.body;
  try {
    const newReservation = new CatReservationEntity();
    newReservation.group_leader = group_leader;
    newReservation.sub_group_leader = sub_group_leader;
    const clientFound = await CatClientEntity.findOneBy({
      id_cat_client: fk_cat_client,
    });
    for (const detail_room of detail_reservation_room) {
      const newDetailReservationRoom = new DetailReservationRoomEntity();
      newDetailReservationRoom.total_people_booked = detail_room.total_people_booked;
      const roomFound = await CatRoomEntity.findOneBy({
        id_cat_room: detail_room.fk_cat_room,
        status: true,
      });
      newDetailReservationRoom.cat_room = roomFound!;
      await newDetailReservationRoom.save();
    }
    newReservation.cat_client = clientFound!;
    newReservation.save();
    return res.status(200).json({
      reservation: newReservation,
    });
  } catch (error) {
    console.error("Internal server error:", error);
    res.status(500).json({ msg: "Internal server error" });
  }
};

export const reservationDelete = async (req: Request, res: Response) => {
  const { id_cat_reservation } = req.params;
  try {
    const reservationFound = await CatReservationEntity.findOneBy({
      id_cat_reservation: parseInt(id_cat_reservation),
    });
    reservationFound!.status = false;
    reservationFound!.save();
    return res.status(200).json({
      msg: 'Logically deleted reservation',
    });
  } catch (error) {
    console.error("Internal server error:", error);
    res.status(500).json({ msg: "Internal server error" });
  }
};
