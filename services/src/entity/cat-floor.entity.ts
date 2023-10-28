
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
} from 'typeorm';

import { DetailRoleFloorEntity } from './detail-role-floor.entity';
import { CatRoomEntity } from './cat-room.entity';


@Entity({ name: 'cat_floor', schema: 'public' })
export class CatFloorEntity extends BaseEntity {

  @PrimaryGeneratedColumn('increment')
  id_cat_floor?: number;

  @Column()
  number!: number;

  @Column({ nullable: true })
  name?: string;

  @Column({ default: true })
  status: boolean = true;

  @OneToMany(type => CatRoomEntity, catRoomEntity => catRoomEntity.fkCatFloorEntity) catFloorEntity!: CatFloorEntity[];

  @OneToMany(type => DetailRoleFloorEntity, (detailRoleFloor: DetailRoleFloorEntity) => detailRoleFloor.floors)
  floorRoles!: DetailRoleFloorEntity[];

}
