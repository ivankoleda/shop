import { ApiProperty } from '@nestjs/swagger';

export class SignUpDto {
  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;
}
