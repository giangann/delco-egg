import {
    Column,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';

// Entities
import { BaseEntity } from '../base/base.entity';
@Entity('order-detail', { orderBy: { createdAt: 'ASC' } })
export class OrderDetail extends BaseEntity {
  // id, order_id, egg_id, deal_price, quantity

  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ type: 'int', nullable: false })
  @ManyToOne('order', { primary: true })
  order_id: number;

  @Column({ type: 'int', nullable: false })
  @ManyToOne('egg', { primary: true })
  egg_id: number;

  @Column({ nullable: false })
  deal_price: number;

  @Column({ nullable: false })
  quantity: number;
}
