
import {
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne,
  Column,
  JoinColumn,
} from 'typeorm';

import { CatReservationEntity } from './cat-reservation.entity';
import { CatRoomEntity } from './cat-room.entity';


@Entity({ name: 'detail_reservation_room', schema: 'public' })
export class DetailReservationRoomEntity extends BaseEntity {

  @PrimaryGeneratedColumn('increment')
  id_detail_reservation_room?: number;
  
  @Column()
  total_people_booked!: number;

  @Column({ default: null })
  total_people_arrived?: number;;
  
  @Column({ default: false })
  supplies_delivered: boolean = false;
  
  @Column({ default: false })
  parking_pass_delivered: boolean = false;
  
  @Column({ default: false })
  parking_pass_returned: boolean = false;
  
  @Column({ default: null })
  extra_parking_pass?: number;

  @Column({ default: false })
  extra_parking_pass_returned: boolean = false;
  
  @Column({ default: false })
  keys_delivered: boolean = false;
  
  @Column({ default: false })
  keys_returned: boolean = false;
  
  @Column({ default: false })
  baggage_claim: boolean = false;
  
  @ManyToOne(type => CatReservationEntity, (reservation: CatReservationEntity) => reservation.detail_reservation_room)
  @JoinColumn({name: "fk_cat_reservation"})
  cat_reservation!: CatReservationEntity;
  
  @ManyToOne(type => CatRoomEntity, (room: CatRoomEntity) => room.detail_reservation_room)
  @JoinColumn({name: "fk_cat_room"})
  cat_room!: CatRoomEntity;

}
