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
    user.roles = ['customer'];

    return this.userRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(id: string): Promise<User> {
    return this.userRepository.findOne(id);
  }

  async findByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({ where: { email } });
  }

  async createAdmin(): Promise<void> {
    const adminExists = await this.userRepository.findOne({
      where: { email: 'admin@admin.com' },
    });
    if (adminExists) return;
    const admin = new User();
    admin.firstName = 'John';
    admin.lastName = 'Doe';
    admin.email = 'admin@admin.com';
    admin.password = 'QBX5vruesc';
    admin.roles = ['admin'];

    await this.userRepository.save(admin);
  }
}
