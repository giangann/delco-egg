import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

// Entities
import APP_CONSTANTS from '../../constants/application';
import { BaseEntity } from '../base/base.entity';
import { User } from '../user/user.entity';
import { OrderDetail } from '../order-detail/order-detail.entity';
import { OrderNoti } from '../order-notification/order-notification.entity';
@Entity('order', { orderBy: { createdAt: 'ASC' } })
export class Order extends BaseEntity {
  // id, user_id, status, date, time, reason, note

  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ type: 'int', nullable: false })
  user_id: number;

  @Column({
    type: 'int',
    nullable: false,
    default: APP_CONSTANTS.status.WAITING_APPROVAL,
  })
  status: number;

  @Column({ type: 'date', nullable: false })
  date: string;

  @Column({ type: 'time', nullable: false })
  time: string;

  @Column({ length: 255, nullable: true })
  reason: string;

  @Column({ length: 255, nullable: true })
  note: string;

  @ManyToOne(() => User, (user) => user.orders)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: User;

  @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.order)
  @JoinColumn({ name: 'id', referencedColumnName: 'order_id' })
  items: OrderDetail[];

  @OneToMany(() => OrderNoti, (noti) => noti.order)
  @JoinColumn({ name: 'id', referencedColumnName: 'order_id' })
  notis: OrderNoti[];
}
