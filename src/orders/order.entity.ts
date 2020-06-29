import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { OrderProduct } from './order-product.entity';

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
}
