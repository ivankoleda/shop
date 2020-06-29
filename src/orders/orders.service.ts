import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './order.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { Product } from '../products/product.entity';
import { OrderProduct } from './order-product.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(OrderProduct)
    private readonly orderProductRepository: Repository<OrderProduct>,
  ) {}

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const order = new Order();
    order.address = createOrderDto.address;
    order.fullName = createOrderDto.fullName;
    order.phone = createOrderDto.phone;
    // TODO: look for ways to save faster

    await this.orderRepository.save(order);

    order.orderProducts = await Promise.all(
      createOrderDto.orderProducts.map(async orderProductDto => {
        const orderProduct = new OrderProduct();
        const product = await this.productRepository.findOne(
          orderProductDto.product.id,
        );
        // TODO add check if count more than amount
        orderProduct.count = orderProductDto.count;
        orderProduct.order = { ...order };
        orderProduct.product = product;
        return this.orderProductRepository.save(orderProduct);
      }),
    );

    return order;
  }

  async findAll(): Promise<Order[]> {
    return this.orderRepository.find();
  }

  async findOne(id: string): Promise<Order> {
    return this.orderRepository.findOne(id);
  }
}
