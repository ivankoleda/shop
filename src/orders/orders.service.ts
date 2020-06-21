import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './order.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { Product } from '../products/product.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const order = new Order();
    order.address = createOrderDto.address;
    order.fullName = createOrderDto.fullName;
    order.phone = createOrderDto.phone;
    // TODO: look for ways to save faster
    order.products = await this.productRepository.findByIds(
      createOrderDto.products.map(({ id }) => id),
    );

    return this.orderRepository.save(order);
  }

  async findAll(): Promise<Order[]> {
    return this.orderRepository.find({ relations: ['products'] });
  }

  async findOne(id: string): Promise<Order> {
    return this.orderRepository.findOne(id, { relations: ['products'] });
  }
}
