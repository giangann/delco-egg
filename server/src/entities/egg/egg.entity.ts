import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from '../base/base.entity';

// Entities

// columns: id, type_name, weight, createdAt
@Entity('egg', { orderBy: { id: 'DESC' } })
export class Egg extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ length: 20, nullable: false })
  type_name: string;

  @Column({ nullable: false })
  weight: string;

  @Column({ default: false })
  isDeleted: boolean;
}
