import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';
import { UsersModule } from './users/users.module';

const getDbConnectionConfig = () =>
  process.env.DATABASE_URL
    ? { url: process.env.DATABASE_URL }
    : {
        host: 'localhost',
        port: 5432,
        username: 'root',
        password: 'root',
        database: 'root',
      };

@Module({
  imports: [
    ConfigModule.forRoot(),
    // TODO check if it is possible to get settings from ormconfig
    TypeOrmModule.forRoot({
      type: 'postgres',
      autoLoadEntities: true,
      synchronize: true,
      keepConnectionAlive: true,
      logging: true,
      ...getDbConnectionConfig(),
    }),
    ProductsModule,
    OrdersModule,
    UsersModule,
  ],
})
export class AppModule {}
