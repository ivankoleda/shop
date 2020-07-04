import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { OrderProduct } from './order-product.entity';
import { User } from '../users/user.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  address: string;

  @Column()
  fullName: string;

  @Column()
  phone: string;

  @OneToMany(
    type => OrderProduct,
    orderProduct => orderProduct.order,
  )
  orderProducts: OrderProduct[];

  @ManyToOne(type => User, { nullable: false })
  @JoinColumn()
  user: User;
}
