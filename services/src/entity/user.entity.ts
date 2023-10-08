
import { v4 as uuidv4 } from 'uuid';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import {
  RoleEntity
} from './role.entity';


@Entity({ name: 'cat_user', schema: 'public' })
export class UserEntity extends BaseEntity {

  @PrimaryGeneratedColumn('uuid')
  uuid: string = uuidv4();

  @Column()
  email!: string;

  @Column()
  user_name!: string;

  @Column()
  password!: string;

  @Column({ default: true })
  status: boolean = true;

  @ManyToMany(() => RoleEntity)
  @JoinTable({ name: 'detail_user_role', schema: 'public' })
  roles!: RoleEntity[];

  checkUpdate(objUser: UserInterface){
    if (objUser.email !== null) this.email = objUser.email;
    if (objUser.user_name !== null) this.user_name = objUser.user_name;
    if (objUser.password !== null) this.password = objUser.password;
    if (objUser.password !== null) this.password = objUser.password;
    if (objUser.status !== null) this.status = objUser.status;
    if (objUser.roles !== null) this.roles = objUser.roles;
  }
}

export interface UserInterface {
  uuid?: string;
  email: string;
  user_name: string;
  password: string;
  status: boolean;
  roles: RoleEntity[];
}

