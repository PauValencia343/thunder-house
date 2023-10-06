
import { Request, Response } from "express";
import { UserModel } from "../models";
import { Op } from "sequelize";

// Define an array of allowed collections
const allowedCollections = ["users"];

// Define a function called 'buscarUsuarios' that searches for users based on a search term
const buscarUsuarios = async (term = "", res: Response) => {
  const isUUID = true;

  if (isUUID) {
    // If it's a UUID ID, search for a user by primary key
    const user = await UserModel.findByPk(term);
    return res.json({
      results: user ? [user] : [], // Return the user if found, or an empty array if not
    });
  }

  // If it's not a UUID ID, perform a case-insensitive search for users
  const regex = new RegExp(term, "i");
  const users: UserModel[] = await UserModel.findAll({
    where: {
      status: true,
      [Op.or]: [
        { userName: { [Op.regexp]: term } },
        { email: { [Op.regexp]: term } },
      ],
    },
  });

  // Return the search results
  return res.json({
    results: users,
  });
};

// Define a function called 'buscar' to handle search requests
export const buscar = (req: Request, res: Response) => {
  const { collection, term } = req.params;

  // Check if the requested collection is allowed
  if (!allowedCollections.includes(collection)) {
    return res.status(400).json({
      msg: `Allowed collections are ${allowedCollections.join(", ")}`,
    });
  }

  switch (collection) {
    case "users":
      buscarUsuarios(term, res); // Call 'buscarUsuarios' to search for users
      break;
    default:
      res.status(500).json({
        msg: "Server error",
      });
      break;
  }
};
