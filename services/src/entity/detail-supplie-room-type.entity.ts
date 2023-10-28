
import {
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne,
  Column,
  JoinColumn,
} from 'typeorm';

import { CatSupplieEntity } from './cat-supplie.entity';
import { CatRoomTypeEntity } from './cat-room-type.entity';


@Entity({ name: 'detail_supplie_room_type', schema: 'public' })
export class DetailSupplieRoomTypeEntity extends BaseEntity {

  @PrimaryGeneratedColumn('increment')
  id_detail_supplie_room_type?: number;
  
  @Column()
  total_supplies!: number;

  @ManyToOne(type => CatSupplieEntity, (supplie: CatSupplieEntity) => supplie.supplieRoomTypes)
  @JoinColumn({name: "fk_cat_supplie"})
  supplies!: CatSupplieEntity;
  
  @ManyToOne(type => CatRoomTypeEntity, (roomType: CatRoomTypeEntity) => roomType.roomTypeSupplies)
  @JoinColumn({name: "fk_cat_room_type"})
  roomTypes!: CatRoomTypeEntity;

}
