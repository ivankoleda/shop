import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  BeforeInsert,
  Unique,
} from 'typeorm';
import { compare, genSalt, hash } from 'bcrypt';

@Entity()
@Unique(['email'])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column('simple-array')
  roles: string[];

  @BeforeInsert()
  async generate() {
    const salt = await genSalt(10);
    this.password = await hash(this.password, salt);
  }

  async comparePassword(password: string): Promise<boolean> {
    return await compare(password, this.password);
  }
}
