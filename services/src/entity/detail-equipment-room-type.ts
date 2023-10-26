
import {
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne,
  Column,
  JoinColumn,
} from 'typeorm';

import { CatEquipmentEntity } from './cat-equipment.entity';
import { CatRoomTypeEntity } from './cat-room-type.entity';


@Entity({ name: 'detail_equipment_room_type', schema: 'public' })
export class DetailEquipmentRoomTypeEntity extends BaseEntity {

  @PrimaryGeneratedColumn('increment')
  id_detail_equipment_room_type?: number;
  
  @Column()
  total_equipments!: number;

  @ManyToOne(type => CatEquipmentEntity, (equipment: CatEquipmentEntity) => equipment.equipmentRoomTypes)
  @JoinColumn({name: "fk_cat_equipment"})
  equipments!: CatEquipmentEntity;
  
  @ManyToOne(type => CatRoomTypeEntity, (roomType: CatRoomTypeEntity) => roomType.roomTypeEquipments)
  @JoinColumn({name: "fk_cat_room_type"})
  roomTypes!: CatRoomTypeEntity;

}
