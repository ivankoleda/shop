import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './order.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { Product } from '../products/product.entity';
import { OrderProduct } from './order-product.entity';
import { User } from '../users/user.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(OrderProduct)
    private readonly orderProductRepository: Repository<OrderProduct>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createOrderDto: CreateOrderDto, userId: string): Promise<Order> {
    const user = await this.userRepository.findOne(userId);

    const order = new Order();
    order.user = user;
    order.address = createOrderDto.address;
    order.fullName = createOrderDto.fullName;
    order.phone = createOrderDto.phone;
    order.comment = createOrderDto.comment;
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
        orderProduct.order = Object.assign({}, order);
        orderProduct.product = product;
        return this.orderProductRepository.save(orderProduct);
      }),
    );

    return order;
  }

  async findOne(id: string): Promise<Order> {
    return this.orderRepository.findOne(id, {
      relations: ['orderProducts', 'orderProducts.product'],
      where: { id },
    });
  }

  async findByUserId(id: string) {
    // return this.orderRepository.find({ relations: ['user'] });
    return this.orderRepository.find({
      relations: ['orderProducts', 'orderProducts.product'],
      where: { user: { id } },
    });
  }
}
