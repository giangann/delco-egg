import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Egg } from '../egg/egg.entity';

// Entities
@Entity('egg_price_qty')
export class EggPriceQty {
  // id, egg_id, price_1, price_2, price_3, quantity, date

  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @JoinColumn({ name: 'egg_id', referencedColumnName: 'id' })
  @OneToOne(() => Egg)
  egg: Egg;

  @Column({ type: 'int', nullable: false, unique: true })
  egg_id: number;

  @Column({ nullable: true })
  price_1: number;

  @Column({ nullable: true })
  price_2: number;

  @Column({ nullable: true })
  price_3: number;

  @Column({ nullable: true })
  quantity: number;

  @Column({ nullable: false, default: 'CURRENT_TIMESTAMP' })
  date: string;
}
