import { ApiProperty } from '@nestjs/swagger';

export class AuthDto {
  @ApiProperty()
  accessToken: string;

  @ApiProperty()
  user: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
  };
}
