
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
} from 'typeorm';

import { DetailUserRoleEntity } from './detail-user-role.entity';
import { DetailRoleFloorEntity } from './detail-role-floor.entity';


@Entity({ name: 'cat_role', schema: 'public' })
export class CatRoleEntity extends BaseEntity {

  @PrimaryGeneratedColumn('increment')
  id_cat_role?: number;

  @Column()
  role!: string;

  @Column({ default: true })
  status: boolean = true;

  @OneToMany(type => DetailUserRoleEntity, (detailUserRole: DetailUserRoleEntity) => detailUserRole.roles)
  roleUsers!: DetailUserRoleEntity[];

  @OneToMany(type => DetailRoleFloorEntity, (detailRoleFloor: DetailRoleFloorEntity) => detailRoleFloor.roles)
  roleFloors!: DetailRoleFloorEntity[];

  assignStatus(status: boolean){
    if (status !== null) {
      this.status = status;
    }
  }
  
}
