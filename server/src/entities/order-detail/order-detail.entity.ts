import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

// Entities
import { BaseEntity } from '../base/base.entity';
import { Order } from '../order/order.entity';
@Entity('order_detail', { orderBy: { createdAt: 'ASC' } })
export class OrderDetail extends BaseEntity {
  // id, order_id, egg_id, deal_price, quantity

  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ type: 'int', nullable: false })
  order_id: number;

  @Column({ type: 'int', nullable: false })
  egg_id: number;

  @Column({ nullable: false })
  deal_price: number;

  @Column({ nullable: false })
  quantity: number;

  @ManyToOne(() => Order, (order) => order.items)
  @JoinColumn({ name: 'order_id', referencedColumnName: 'id' })
  order: Order;
}
