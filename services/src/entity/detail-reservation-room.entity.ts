
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

  // stay
  @Column({ type: 'date' })
  start_date!: Date;

  @Column({ type: 'date' })
  end_date!: Date;

  // total people
  @Column()
  total_people_booked!: number;

  @Column({ default: null })
  total_people_arrived?: number;

  // parking pass
  @Column({ default: false })
  parking_pass_delivered: boolean = false;

  @Column({ default: false })
  parking_pass_returned: boolean = false;

  @Column({ nullable: true })
  parking_pass_forgot: boolean = false;

  // extra parking pass
  @Column({ default: null })
  extra_parking_pass?: number;

  @Column({ default: null })
  extra_parking_pass_returned?: number;

  // key
  @Column({ default: false })
  key_delivered: boolean = false;

  @Column({ default: false })
  key_returned: boolean = false;

  @Column({ default: false })
  key_forgot: boolean = false;

  // baggage claim
  @Column({ default: false })
  baggage_claim: boolean = false;

  // supplies
  @Column({ default: false })
  supplies_delivered: boolean = false;

  // breakfast
  @Column()
  has_breakfast!: boolean;
  
  // observations
  @Column({ nullable: true })
  observations?: string;
  
  // extra charges
  @Column("decimal", { precision: 10, scale: 2, nullable: true })
  extra_charges?: number;

  @ManyToOne(type => CatReservationEntity, (reservation: CatReservationEntity) => reservation.detail_reservation_room)
  @JoinColumn({name: "fk_cat_reservation"})
  cat_reservation!: CatReservationEntity;

  @ManyToOne(type => CatRoomEntity, (room: CatRoomEntity) => room.detail_reservation_room)
  @JoinColumn({name: "fk_cat_room"})
  cat_room!: CatRoomEntity;

}
