import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from './product.model';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  //:Promise<Product>
  async createProduct(product) {
    return this.productModel.create(product);
  }

  async findAll(): Promise<Product[]> {
    return this.productModel.find().exec();
  }
}
