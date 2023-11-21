
import { Request, Response } from "express";

import { CatClientEntity, CatReservationEntity, CatRoomEntity, DetailReservationRoomEntity } from "../../entity";
import { getPrice } from "../../calculous/get-price-by-day";
import { COST_BREAKFAST } from "../../calculous/get-price-reservation";


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
    is_from_platform_promotion,
    fk_cat_client,
    status,
  }: {
    group_leader: string,
    sub_group_leader: string,
    is_from_platform_promotion: boolean,
    observations: string,
    extra_charges: number,
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
    reservationFound!.is_from_platform_promotion = is_from_platform_promotion;
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
    is_from_platform_promotion,
    fk_cat_client,
    detail_reservation_room,
  }: {
    group_leader: string,
    sub_group_leader: string,
    is_from_platform_promotion: boolean,
    fk_cat_client: number,
    detail_reservation_room: {
      fk_cat_room: number,
      has_breakfast: boolean,
      total_people_booked: number,
      start_date: string,
      end_date: string,
    }[],
  } = req.body;
  try {
    let totalPriceByRooms = 0;
    let totalPersonsByRooms = 0;
    const newReservation = new CatReservationEntity();
    newReservation.group_leader = group_leader;
    newReservation.sub_group_leader = sub_group_leader;
    newReservation.is_from_platform_promotion = is_from_platform_promotion;
    const clientFound = await CatClientEntity.findOneBy({
      id_cat_client: fk_cat_client,
    });
    
    for (const detail_room of detail_reservation_room) {
      const newDetailReservationRoom = new DetailReservationRoomEntity();
      newDetailReservationRoom.total_people_booked = detail_room.total_people_booked;
      newDetailReservationRoom.has_breakfast = detail_room.has_breakfast;
      newDetailReservationRoom.start_date = new Date(detail_room.start_date);
      newDetailReservationRoom.end_date = new Date(detail_room.end_date);
      const roomFound = await CatRoomEntity.findOneBy({
        id_cat_room: detail_room.fk_cat_room,
        status: true,
      });
      newDetailReservationRoom.cat_room = roomFound!;
      await newDetailReservationRoom.save();
      
      const oneDay = 24 * 60 * 60 * 1000;
      const diffDays = Math.ceil(Math.abs((newDetailReservationRoom.end_date.getTime() - newDetailReservationRoom.start_date.getTime()) / oneDay));

      if (detail_room.has_breakfast) {
        totalPriceByRooms += COST_BREAKFAST * detail_room.total_people_booked * diffDays;
      }
      totalPriceByRooms += detail_room.total_people_booked * diffDays;
      totalPersonsByRooms += roomFound!.cat_room_type.price;
    }

    newReservation.cat_client = clientFound!;
    const totalPriceReservation = getPrice(totalPriceByRooms, totalPersonsByRooms, is_from_platform_promotion);
    newReservation.total = totalPriceByRooms;
    newReservation.subtotal = totalPriceReservation;
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
