import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  price: number;

  @Column()
  country: string;

  @Column()
  description: string;

  @Column()
  countAvailable: number;

  @Column()
  imageUrl: string;
}
