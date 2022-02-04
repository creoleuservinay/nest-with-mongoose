import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cache } from 'cache-manager';
import { Model } from 'mongoose';
import { Product, ProductDocument } from './product.model';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  //:Promise<Product>
  async createProduct(product) {
    return this.productModel.create(product);
  }

  async findAll(): Promise<Product[]> {
    const products = this.productModel.find().exec();
    return products;
  }

  async returnGreet() {
    const greetMessage = await this.cacheManager.get('greet_message');
    if (greetMessage) {
      return greetMessage;
    }
    await this.cacheManager.set('greet_message', `Hello  world`);
    return await this.cacheManager.get('greet_message');
  }
}
