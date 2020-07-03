import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { SignUpDto } from './dto/sign-up';
import { UsersService } from './users.service';
import { User } from './user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createProductDto: SignUpDto): Promise<User> {
    return this.usersService.create(createProductDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<User> {
    return this.usersService.findOne(id);
  }

  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }
}
