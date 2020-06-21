import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  country: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  countAvailable: number;
}
