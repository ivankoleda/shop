import { Column, Entity, PrimaryGeneratedColumn, BeforeInsert } from 'typeorm';
import { compare, genSalt, hash } from 'bcrypt';

@Entity()
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

  @BeforeInsert()
  async generate() {
    const salt = await genSalt(10);
    this.password = await hash(this.password, salt);
  }

  async comparePassword(password: string): Promise<boolean> {
    return await compare(password, this.password);
  }
}
