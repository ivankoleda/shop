import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { SignUpDto } from './dto/sign-up';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(signUpDto: SignUpDto): Promise<User> {
    const user = new User();
    user.firstName = signUpDto.firstName;
    user.lastName = signUpDto.lastName;
    user.email = signUpDto.email;
    user.password = signUpDto.password;

    return this.userRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    const user = new User();
    // user.firstName = 'Ivan';
    // user.lastName = 'Koleda';
    // user.email = 'qweqwe@gmail.com';
    // user.password = 'password';
    // this.userRepository.save(user);
    return this.userRepository.find();
  }

  async findOne(id: string): Promise<User> {
    return this.userRepository.findOne(id);
  }

  async findByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({ where: { email } });
  }
}
