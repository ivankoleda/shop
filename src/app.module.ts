import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [
    // TODO check if it is possible to get settings from ormconfig
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3307,
      username: 'root',
      password: 'root',
      database: 'shop',
      autoLoadEntities: true,
      synchronize: true,
      keepConnectionAlive: true,
    }),
    ProductsModule,
    OrdersModule,
  ],
})
export class AppModule {}
