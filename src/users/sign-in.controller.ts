import { Body, Controller, Post } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { classToPlain } from 'class-transformer';
import { SignInDto } from './dto/sign-in';
import { UsersService } from './users.service';
import { User } from './user.entity';

@Controller('sign-in')
export class SignInController {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  @Post()
  async signIn(
    @Body() signInDto: SignInDto,
  ): Promise<{ accessToken: string; user: User }> {
    // should not be in the controller
    const user = await this.usersService.findByEmail(signInDto.email);
    const passwordIsCorrect = await user.comparePassword(signInDto.password);

    if (!passwordIsCorrect) {
      throw new Error('Invalid credentials');
    }

    return {
      accessToken: this.jwtService.sign(classToPlain(user)),
      user: user,
    };
  }
}
