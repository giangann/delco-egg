import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  OneToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm';

// Entities
import { BaseEntity } from '../base/base.entity';
import { Order } from '../order/order.entity';

@Entity('user', { orderBy: { id: 'DESC' } })
export class User extends BaseEntity {
  // username, password, phone_number, fullname, company_name, note, *softdelete

  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ length: 100, nullable: false })
  @Unique(['username'])
  username: string;

  @Column({ length: 100, nullable: false, select: false })
  password: string;

  @Column({ length: 100, nullable: false })
  phone_number: string;

  @Column({ length: 255, nullable: false })
  fullname: string;

  @Column({ default: false })
  isAdmin: boolean;

  @Column({ length: 255 })
  company_name: string;

  @Column({ length: 255 })
  note: string;

  @Column({ default: false })
  isDeleted: boolean;

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];

  toJSON() {
    delete this.isDeleted;
    return this;
  }
}
