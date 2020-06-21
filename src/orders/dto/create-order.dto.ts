import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {
  @ApiProperty()
  address: string;

  @ApiProperty()
  products: {
    id: number;
  }[];
}
