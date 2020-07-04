import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {
  @ApiProperty()
  address: string;

  @ApiProperty()
  fullName: string;

  @ApiProperty()
  phone: string;

  @ApiProperty()
  comment: string;

  @ApiProperty()
  orderProducts: { count: number; product: { id: number } }[];
}
