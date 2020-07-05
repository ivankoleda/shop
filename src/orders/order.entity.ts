import {
  Column,
  AfterLoad,
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

  @Column()
  comment: string;

  @OneToMany(
    type => OrderProduct,
    orderProduct => orderProduct.order,
    { nullable: false },
  )
  orderProducts: OrderProduct[];

  @ManyToOne(type => User, { nullable: false })
  @JoinColumn()
  user: User;

  totalCost: number;

  @AfterLoad()
  setComputed() {
    this.totalCost = this.orderProducts.reduce(
      (sum, orderProduct) =>
        sum + orderProduct.product.price * orderProduct.count,
      0,
    );
  }
}
