
import { Request, Response } from "express";

import {
  CatRoleEntity,
  CatUserEntity,
  DetailUserRoleEntity,
  UserInterface,
} from "../../entity";
import { generatePassword } from "../../helpers";


export const userGet = async (req: Request, res: Response) => {
  try {
    const { id_cat_user } = req.params;
    const userFound = await CatUserEntity.findOne({
      where: {
        id_cat_user: parseInt(id_cat_user),
        status: true,
      },
    });

    const user: any = { ...userFound };
    delete user.password;
    
    return res.status(200).json({
      user,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: 'Internal server error',
    });
  }
};
// export const userGetAll = async (req: Request, res: Response) => {
//   const { limit = 10, page = 1 } = req.query;
//   const parsedPage = parseInt(page as string, 10);
//   const parsedLimit = parseInt(limit as string, 10);
//   const skip = (parsedPage - 1) * parsedLimit;
//   try {
//     const list = await AppDataSource
//       .createQueryBuilder()
//       .select()
//       .from(CatFloorEntity, "cf")
//       .innerJoin(DetailRoleFloorEntity, "drf", "cf.id_cat_floor = drf.fk_cat_floor")
//       .innerJoin(CatRoleEntity, "cr", "drf.fk_cat_role = cr.id_cat_role")
//       .innerJoin(DetailUserRoleEntity, "dur", "cr.id_cat_role = dur.fk_cat_role")
//       .innerJoin(CatUserEntity, "cu", "dur.fk_cat_user = cu.id_cat_user")
//       .limit(parsedLimit)
//       .offset(skip)
//       .execute();
//     const listResult: any[] = list.map((user: any) => {
//       const { password, ...rest } = user;
//       return rest;
//     });
//     return res.status(200).json({
//       list: listResult,
//       count: listResult.length,
//     });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({
//       error: 'Internal server error',
//     });
//   }
// };

export const userGetAll = async (req: Request, res: Response) => {
  const { limit = 10, page = 1 } = req.query;
  const parsedPage = parseInt(page as string, 10);
  const parsedLimit = parseInt(limit as string, 10);
  const skip = (parsedPage - 1) * parsedLimit;
  try {
    const list = await CatUserEntity.find({
      skip,
      take: parsedLimit,
      where: {
        status: true,
      },
    });
    const listResult: any[] = list.map((user) => {
      const { password, ...rest } = user;
      return rest;
    });
    return res.status(200).json({
      list: listResult,
      count: listResult.length,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: 'Internal server error',
    });
  }
};

export const userPut = async (req: Request, res: Response) => {
  const { id_cat_user } = req.params;
  const {
    password,
    email,
    user_name,
    roles,
    status,
  }: {
    password: string,
    email: string,
    user_name: string,
    roles: {id_role: string}[],
    status: boolean,
  } = req.body;
  try {
    const userFound = await CatUserEntity.findOne({
      where: {
        id_cat_user: parseInt(id_cat_user),
      },
    });
    
    userFound!.password = generatePassword(password);
    userFound!.email = email;
    userFound!.user_name = user_name;
    userFound!.status = status;
    userFound!.save();
    const foundDetailUserRoleEntity = await DetailUserRoleEntity.findBy({
      users: !userFound
    });
    for (const item of foundDetailUserRoleEntity) {
      await item.remove();
    }
    for (const role of roles) {
      const newDetailUserRoleEntity = new DetailUserRoleEntity();
      const roleFound = await CatRoleEntity.findOne({
        where: {
          id_cat_role: parseInt(role.id_role),
          status: true,
        },
      });
      newDetailUserRoleEntity.roles = roleFound!;
      newDetailUserRoleEntity.users = userFound!;
      await newDetailUserRoleEntity.save();
    }

    const user: any = { ...userFound };
    delete user.password;
    
    return res.status(200).json({
      user,
    });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ msg: "Internal server error" });
  }
};

export const userPost = async (req: Request, res: Response) => {
  const {
    password,
    email,
    user_name,
    roles,
  }: {
    password: string,
    email: string,
    user_name: string,
    roles: {id_role: string}[],
  } = req.body;
  try {
    const newUser = new CatUserEntity();
    newUser.email = email;
    newUser.user_name = user_name;
    newUser.password = generatePassword(password);
    await newUser.save();
    for (const role of roles) {
      const newDetailUserRoleEntity = new DetailUserRoleEntity();
      const roleFound = await CatRoleEntity.findOne({
        where: {
          id_cat_role: parseInt(role.id_role),
          status: true,
        },
      });
      newDetailUserRoleEntity.roles = roleFound!;
      newDetailUserRoleEntity.users = newUser;
      await newDetailUserRoleEntity.save();
    }
    const user: any = { ...newUser };
    delete user.password;
    
    return res.status(200).json({
      user,
    });
  } catch (error) {
    return res.status(500).json({
      error: "An error occurred while creating the user.",
    });
  }
};


export const userDelete = async (req: Request, res: Response) => {
  const { id_cat_user } = req.params;
  try {
    const userFound = await CatUserEntity.findOne({
      where: {
        id_cat_user: parseInt(id_cat_user),
      },
    });
    if (!userFound) {
      return res.status(404).json({ error: "User not found" });
    }
    userFound.status = false;
    await userFound.save();
    // const authenticatedUser = req.user;
    
    const user: any = { ...userFound };
    delete user.password;
    
    return res.status(200).json({
      user,
      // authenticatedUser,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const userDeletePhysical = async (req: Request, res: Response) => {
  const { id_cat_user } = req.params;
  try {
    const userFound = await CatUserEntity.findOne({
      where: {
        id_cat_user: parseInt(id_cat_user),
      },
    });
    const foundDetailUserRoleEntity = await DetailUserRoleEntity.findBy({
      users: !userFound
    });
    for (const item of foundDetailUserRoleEntity) {
      await item.remove();
    }
    await userFound!.remove();

    const user: any = { ...userFound };
    delete user.password;
    
    return res.status(200).json({
      user,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
