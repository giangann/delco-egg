import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from '../base/base.entity';
import { User } from '../user/user.entity';
import { Order } from '../order/order.entity';
import { boolean } from 'joi';

@Entity('order_notification', { orderBy: { createdAt: 'DESC' } })
export class OrderNoti extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ type: 'int', nullable: false })
  from_user_id: number;

  @Column({ type: 'int', nullable: false })
  to_user_id: number;

  @Column({ type: 'int', nullable: false })
  order_id: number;

  @Column({ type: 'int', nullable: false })
  new_status: number;

  @Column({ nullable: true })
  content: string;

  @Column({ nullable: true, default: false })
  is_read: boolean;
  
  @Column({ nullable: true, default: true })
  is_display: boolean;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'from_user_id', referencedColumnName: 'id' })
  from_user: User;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'to_user_id', referencedColumnName: 'id' })
  to_user: User;

  @ManyToOne(() => Order,(order) => order.notis)
  @JoinColumn({ name: 'order_id', referencedColumnName: 'id' })
  order: Order;
}
