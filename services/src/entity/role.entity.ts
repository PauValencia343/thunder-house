
import { v4 as uuidv4 } from 'uuid';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  JoinTable,
} from 'typeorm';
import {
  UserEntity
} from './user.entity';


@Entity({ name: 'cat_role', schema: 'public' })
export class RoleEntity extends BaseEntity {

  @PrimaryGeneratedColumn('uuid')
  uuid: string = uuidv4();

  @Column()
  role!: string;

  @Column({ default: true })
  status: boolean = true;

  @JoinTable()
  users?: UserEntity[];

  assignStatus(status: boolean){
    if (status !== null) {
      this.status = status;
    }
  }
}
