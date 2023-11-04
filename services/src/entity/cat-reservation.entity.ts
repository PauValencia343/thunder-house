
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { CatClientEntity } from './cat-client.entity';
import { DetailReservationRoomEntity } from './detail-reservation-room.entity';


@Entity({ name: 'cat_reservation', schema: 'public' })
export class CatReservationEntity extends BaseEntity {

  @PrimaryGeneratedColumn('increment')
  id_cat_reservation?: number;

  @Column({ default: false })
  isPaid: boolean = false;

  @Column()
  group_leader!: string;
  
  @Column()
  sub_group_leader!: string;

  @Column({ type: 'timestamp' })
  date_reservation: Date = new Date();

  @Column({ default: 0 })
  total: number = 0;
  
  @Column({ default: true })
  status: boolean = true;

  @ManyToOne(type => CatClientEntity, catClientEntity => catClientEntity.id_cat_client)
  @JoinColumn({name: "fk_cat_client"})
  cat_client?: CatClientEntity;

  @OneToMany(type => DetailReservationRoomEntity, (detailReservationRoomEntity: DetailReservationRoomEntity) => detailReservationRoomEntity.cat_reservation)
  detail_reservation_room!: DetailReservationRoomEntity[];
}