
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { CatUserEntity } from './cat-user.entity';


@Entity({ name: 'cat_client', schema: 'public' })
export class CatClientEntity extends BaseEntity {

  @PrimaryGeneratedColumn('increment')
  id_cat_client?: number;

  @ManyToOne(type => CatUserEntity, catUserEntity => catUserEntity.id_cat_user)
  @JoinColumn({name: "fk_cat_user"})
  cat_user!: CatUserEntity;
}
