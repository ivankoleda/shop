import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Req,
  UseGuards,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { Order } from './order.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { JwtAuthGuard } from '../users/guards/jwt-auth.guard';

@Controller('orders')
@UseGuards(JwtAuthGuard)
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  findByUserId(@Req() req: any): Promise<Order[]> {
    return this.ordersService.findByUserId(req.user.id);
  }

  @Get(':id')
  remove(@Param('id') id: string): Promise<Order> {
    return this.ordersService.findOne(id);
  }

  @Post()
  create(
    @Body() createProductDto: CreateOrderDto,
    @Req() req: any,
  ): Promise<Order> {
    return this.ordersService.create(createProductDto, req.user.id);
  }
}
