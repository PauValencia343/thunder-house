
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
} from 'typeorm';

import { DetailEquipmentRoomTypeEntity } from './detail-equipment-room-type';
import { CatRoomEntity } from './cat-room.entity';
import { DetailSupplieRoomTypeEntity } from './detail-supplie-room-type.entity';


@Entity({ name: 'cat_room_type', schema: 'public' })
export class CatRoomTypeEntity extends BaseEntity {

  @PrimaryGeneratedColumn('increment')
  id_cat_room_type?: number;

  @Column()
  room_type!: string;

  @Column({ default: true })
  status: boolean = true;
  
  @OneToMany(type => CatRoomEntity, catRoomEntity => catRoomEntity.fkCatRoomTypeEntity) catRoomTypeEntity!: CatRoomTypeEntity[];

  @OneToMany(type => DetailEquipmentRoomTypeEntity, (detailEquipmentRoomTypeEntity: DetailEquipmentRoomTypeEntity) => detailEquipmentRoomTypeEntity.roomTypes)
  roomTypeEquipments!: DetailEquipmentRoomTypeEntity[];
  
  @OneToMany(type => DetailSupplieRoomTypeEntity, (detailSupplieRoomTypeEntity: DetailSupplieRoomTypeEntity) => detailSupplieRoomTypeEntity.roomTypes)
  roomTypeSupplies!: DetailSupplieRoomTypeEntity[];

}
