import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { SignInController } from './sign-in.controller';
import { User } from './user.entity';
import { JwtStrategy } from './strategies/jwt.strategy';
import { SignUpController } from './sign-up.controller';

// filter orders by current user

@Module({
  imports: [
    ConfigModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1d' },
      }),
    }),
    TypeOrmModule.forFeature([User]),
    PassportModule,
  ],
  controllers: [UsersController, SignInController, SignUpController],
  providers: [UsersService, JwtStrategy],
  exports: [TypeOrmModule.forFeature([User])],
})
export class UsersModule {}
