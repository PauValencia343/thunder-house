
import { Entity, EntityManager } from "typeorm";
import bcryptjs from "bcryptjs";

import AppDataSource from "./config";
import {
  CatEmployeeEntity,
  CatEquipmentEntity,
  CatFloorEntity,
  CatPersonEntity,
  CatRoleEntity,
  CatRoomEntity,
  CatRoomStatusEntity,
  CatRoomTypeEntity,
  CatSupplieEntity,
  CatUserEntity,
  DetailEquipmentRoomTypeEntity,
  DetailRoleFloorEntity,
  DetailSupplieRoomTypeEntity,
  DetailUserRoleEntity,
} from "../entity";
import {
  equipmentInitInformation,
  roomStatusInitInformation,
  roomTypeInitInformation,
  supplieInitInformation
} from "./init-data";

const seedDatabase = async () => {
  await truncateTables();
  await generateUsers();
};

const generateUsers = async () => {
  const totalFloors: number = 10;
  // Administrator User
  const roleAdminisatrator = new CatRoleEntity();
  roleAdminisatrator.role = "Administrador";
  
  const userAdministrator = new CatUserEntity();
  userAdministrator.email = process.env.INITIAL_EMAIL || 'testUser@gmail.com';
  userAdministrator.user_name = process.env.INITIAL_USER || 'testUser';
  userAdministrator.password = bcryptjs.hashSync(process.env.INITIAL_PASSWORD || '12345_abAB', bcryptjs.genSaltSync());

  const detailUserRoleEntity = new DetailUserRoleEntity();
  detailUserRoleEntity.cat_user = userAdministrator;
  detailUserRoleEntity.cat_role = roleAdminisatrator;
  
  await roleAdminisatrator.save();
  await userAdministrator.save();
  await detailUserRoleEntity.save();

  
  const newCatEmployeeEntity = new CatEmployeeEntity();
  newCatEmployeeEntity.cat_user = userAdministrator;
  await newCatEmployeeEntity.save();
  const newCatPersonEntity = new CatPersonEntity();
  newCatPersonEntity.name = 'name';
  newCatPersonEntity.surname_father = 'surname_father';
  newCatPersonEntity.surname_mother = 'surname_mother';
  newCatPersonEntity.phone_contact = 'phone_contact';
  newCatPersonEntity.email_contact = 'email_contact';
  newCatPersonEntity!.birth = new Date('2000-12-31');
  newCatPersonEntity.gender = 'gender';
  newCatPersonEntity.street_address = 'street_address';
  newCatPersonEntity.city = 'city';
  newCatPersonEntity.state_province = 'state_province';
  newCatPersonEntity.zip_code = 'zip_code';
  newCatPersonEntity.country = 'country';
  newCatPersonEntity.cat_employee = newCatEmployeeEntity;
  await newCatPersonEntity.save();

  const floorsEntities = [];
  for (let i = 1; i <= totalFloors; i++) {
    // Floors
    const catFloorEntity = new CatFloorEntity();
    catFloorEntity.number = i;
    await catFloorEntity.save();
    floorsEntities.push(catFloorEntity);
    // Administrator Floors
    const detailRoleFloorEntityAdministrator = new DetailRoleFloorEntity();
    detailRoleFloorEntityAdministrator.cat_floor = catFloorEntity;
    detailRoleFloorEntityAdministrator.cat_role = roleAdminisatrator;
    await detailRoleFloorEntityAdministrator.save();

    // Floors Users
    const roleFloorManager = new CatRoleEntity();
    roleFloorManager.role = `Administrador de piso ${i}`;
    
    const userFloorManager = new CatUserEntity();
    userFloorManager.email = `floorManager${i}@gmail.com`;
    userFloorManager.user_name = `floorManager${i}`;
    userFloorManager.password = bcryptjs.hashSync(`fLo0rM${i}`, bcryptjs.genSaltSync());

    const detailUserRoleEntityFloorManager = new DetailUserRoleEntity();
    detailUserRoleEntityFloorManager.cat_user = userFloorManager;
    detailUserRoleEntityFloorManager.cat_role = roleFloorManager;
    
    await roleFloorManager.save();
    await userFloorManager.save();
    await detailUserRoleEntityFloorManager.save();
    const detailRoleFloorEntityFloorManager = new DetailRoleFloorEntity();
    detailRoleFloorEntityFloorManager.cat_floor = catFloorEntity;
    detailRoleFloorEntityFloorManager.cat_role = roleFloorManager;
    await detailRoleFloorEntityFloorManager.save();
  }

  const roomStatusEntities = [];
  for (const roomStatus of roomStatusInitInformation) {
    const newCatRoomStatusEntity = new CatRoomStatusEntity();
    newCatRoomStatusEntity.dirty = roomStatus.dirty;
    newCatRoomStatusEntity.busy = roomStatus.busy;
    await newCatRoomStatusEntity.save();
    roomStatusEntities.push(newCatRoomStatusEntity);
  }
  
  const equipmentEntities = [];
  for (const equipment of equipmentInitInformation) {
    const newCatEquipmentEntity = new CatEquipmentEntity();
    newCatEquipmentEntity.equipment = equipment.equipment;
    newCatEquipmentEntity.total_number_people = equipment.total_number_people;
    await newCatEquipmentEntity.save();
    equipmentEntities.push(newCatEquipmentEntity);
  }
  
  const supplieEntities = [];
  for (const supplie of supplieInitInformation) {
    const newCatSupplieEntity = new CatSupplieEntity();
    newCatSupplieEntity.supplie = supplie.supplie;
    await newCatSupplieEntity.save();
    supplieEntities.push(newCatSupplieEntity);
  }

  const roomTypeEntities = [];
  for (const roomType of roomTypeInitInformation) {
    const newCatRoomTypeEntity = new CatRoomTypeEntity();
    newCatRoomTypeEntity.room_type = roomType.room_type;
    await newCatRoomTypeEntity.save();
    for (let i = 0; i < roomType.equipments.length; i++) {
      if (roomType.equipments[i].equipmentTotal > 0) {
        const newDetailEquipmentRoomTypeEntity = new DetailEquipmentRoomTypeEntity();
        newDetailEquipmentRoomTypeEntity.total_equipments = roomType.equipments[i].equipmentTotal;
        newDetailEquipmentRoomTypeEntity.cat_equipment = equipmentEntities[i];
        newDetailEquipmentRoomTypeEntity.cat_room_type = newCatRoomTypeEntity;
        await newDetailEquipmentRoomTypeEntity.save();
      }
    }
    for (let i = 0; i < roomType.supplies.length; i++) {
      if (roomType.supplies[i].supplieTotal > 0) {
        const newDetailSupplieRoomTypeEntity = new DetailSupplieRoomTypeEntity();
        newDetailSupplieRoomTypeEntity.total_supplies = roomType.supplies[i].supplieTotal;
        newDetailSupplieRoomTypeEntity.cat_supplie = supplieEntities[i];
        newDetailSupplieRoomTypeEntity.cat_room_type = newCatRoomTypeEntity;
        await newDetailSupplieRoomTypeEntity.save();
      }
    }
    roomTypeEntities.push(newCatRoomTypeEntity);
  }

  for (let i = 0; i < floorsEntities.length; i++) {
    const newCatRoomEntity = new CatRoomEntity();
    newCatRoomEntity.number = i + 1;
    newCatRoomEntity.cat_floor = floorsEntities[i];
    newCatRoomEntity.cat_room_status = roomStatusEntities[2];
    newCatRoomEntity.cat_room_type = roomTypeEntities[2];
    await newCatRoomEntity.save();
  }

  
  // const roomsByFloor: number = 10;
  // for (let i = 1; i < 4; i++) {
  //   for (let i = 1; i < roomsByFloor; i++) {
  //   }
  // }
  // for (let i = 1; i < 3; i++) {
  //   for (let i = 1; i < roomsByFloor; i++) {
  //     const newCatRoomEntity = new CatRoomEntity();
  //     newCatRoomEntity.number = i;
  //   }
  // }
  // for (let i = 1; i < 2; i++) {
  //   for (let i = 1; i < roomsByFloor; i++) {
  //     const newCatRoomEntity = new CatRoomEntity();
  //     newCatRoomEntity.number = i;
  //   }
  // }
}

const truncateTables = async () => {
  await executeTruncate(DetailUserRoleEntity)
  await executeTruncate(DetailRoleFloorEntity)
  await executeTruncate(CatRoomEntity);
  await executeTruncate(CatRoleEntity)
  await executeTruncate(CatRoleEntity);
  await executeTruncate(CatUserEntity);
  await executeTruncate(CatFloorEntity);
  await executeTruncate(CatRoomStatusEntity);
  await executeTruncate(DetailEquipmentRoomTypeEntity);
  await executeTruncate(DetailSupplieRoomTypeEntity);
  await executeTruncate(CatEquipmentEntity);
  await executeTruncate(CatSupplieEntity);
  await executeTruncate(CatRoomTypeEntity);
}

const executeTruncate = async (entity: any) => {
  await entity
  .createQueryBuilder()
  .delete()
  .where([])
  .execute();
}

export default seedDatabase;


