

import { Request, Response } from "express";

import { 
  CatReservationEntity,
} from "../../entity";


export const registerArrive = async (req: Request, res: Response) => {
  const { id_cat_reservation } = req.params;
  try {
    const reservationFound: CatReservationEntity | null = await CatReservationEntity.findOne({
      where: {
        id_cat_reservation: parseInt(id_cat_reservation),
        status: true,
      },
    });
    return res.status(200).json({
      reservation: reservationFound,
    });
  } catch (error) {
    console.error("Internal server error:", error);
    res.status(500).json({ msg: "Internal server error" });
  }
};
