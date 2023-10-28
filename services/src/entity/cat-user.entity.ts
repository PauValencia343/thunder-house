
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
} from 'typeorm';

import {
  CatRoleEntity
} from './cat-role.entity';
import { DetailUserRoleEntity } from './detail-user-role.entity';


@Entity({ name: 'cat_user', schema: 'public' })
export class CatUserEntity extends BaseEntity {

  @PrimaryGeneratedColumn('increment')
  id_cat_user?: number;

  @Column()
  email!: string;

  @Column()
  user_name!: string;

  @Column()
  password!: string;

  @Column({ default: true })
  status: boolean = true;
  
  @OneToMany(type => DetailUserRoleEntity, (detailUserRole: DetailUserRoleEntity) => detailUserRole.users)
  userRoles!: DetailUserRoleEntity[];

  checkUpdate(objUser: UserInterface){
    if (objUser.email !== null) this.email = objUser.email;
    if (objUser.user_name !== null) this.user_name = objUser.user_name;
    if (objUser.password !== null) this.password = objUser.password;
    if (objUser.password !== null) this.password = objUser.password;
    if (objUser.status !== null) this.status = objUser.status;
    // if (objUser.roles !== null) this.roles = objUser.roles;
  }

}

export interface UserInterface {
  uuid?: string;
  email: string;
  user_name: string;
  password: string;
  status: boolean;
  roles: CatRoleEntity[];
}

