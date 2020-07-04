import { Controller, Post, Body } from '@nestjs/common';
import { classToPlain } from 'class-transformer';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from './users.service';
import { SignUpDto } from './dto/sign-up';
import { AuthDto } from './dto/auth';

@Controller('sign-up')
export class SignUpController {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  @Post()
  async signUp(@Body() signUpDto: SignUpDto): Promise<AuthDto> {
    const user = await this.usersService.create(signUpDto);
    return {
      accessToken: this.jwtService.sign(classToPlain(user)),
      user,
    };
  }
}
