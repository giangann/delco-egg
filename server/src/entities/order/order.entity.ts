import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm';

// Entities
import APP_CONSTANTS from '../../constants/application';
import { BaseEntity } from '../base/base.entity';
@Entity('order', { orderBy: { createdAt: 'ASC' } })
export class Order extends BaseEntity {
  // id, user_id, status, date, time, reason, note

  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ type: 'int', nullable: false })
  @ManyToOne('user', { primary: true })
  user_id: number;

  @Column({
    type: 'int',
    nullable: false,
    default: APP_CONSTANTS.status.WAITING_APPROVAL,
  })
  status: string;

  @Column({ type: 'date', nullable: false })
  date: string;

  @Column({ type: 'time', nullable: false })
  time: string;

  @Column({ length: 255, nullable: true })
  reason: string;

  @Column({ length: 255, nullable: true })
  note: string;
}
