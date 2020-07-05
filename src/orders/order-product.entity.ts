import { Entity, Column, ManyToOne } from 'typeorm';
import { Order } from './order.entity';
import { Product } from '../products/product.entity';

@Entity()
export class OrderProduct {
  @Column()
  count: number;

  @ManyToOne(
    type => Order,
    order => order.orderProducts,
    { primary: true, nullable: false },
  )
  order: Order;

  @ManyToOne(type => Product, undefined, { primary: true, nullable: false })
  product: Product;
}
