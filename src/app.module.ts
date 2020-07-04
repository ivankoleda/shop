import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
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
      // dropSchema: true,
    }),
    ProductsModule,
    OrdersModule,
    UsersModule,
  ],
})
export class AppModule {}
