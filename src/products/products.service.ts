import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { EditProductDto } from './dto/edit-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
  ) {}

  private setProductFields = (
    product: Product,
    productDto: CreateProductDto,
  ) => {
    product.name = productDto.name;
    product.price = productDto.price;
    product.country = productDto.country;
    product.description = productDto.description;
    product.countAvailable = productDto.countAvailable;
    product.imageUrl = productDto.imageUrl;
  };

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const product = new Product();
    this.setProductFields(product, createProductDto);
    return this.productsRepository.save(product);
  }

  async edit(editProductDto: EditProductDto): Promise<Product> {
    const product = await this.productsRepository.findOne(editProductDto.id);
    this.setProductFields(product, editProductDto);
    return this.productsRepository.save(product);
  }

  async findAll(): Promise<Product[]> {
    return this.productsRepository.find();
  }

  async findOne(id: string): Promise<Product> {
    return this.productsRepository.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.productsRepository.delete(id);
  }
}
