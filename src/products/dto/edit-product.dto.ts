import { ApiProperty } from '@nestjs/swagger';

export class EditProductDto {
  @ApiProperty()
  id: number;

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

  @ApiProperty()
  imageUrl: string;
}
