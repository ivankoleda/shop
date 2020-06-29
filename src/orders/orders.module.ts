import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersController } from './orders.controller';
import { ProductsModule } from '../products/products.module';
import { OrdersService } from './orders.service';
import { Order } from './order.entity';
import { OrderProduct } from './order-product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order, OrderProduct]), ProductsModule],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
