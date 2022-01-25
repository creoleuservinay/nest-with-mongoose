import { Body, Controller, Get, Post } from '@nestjs/common';
import { Product } from './product.model';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {
  constructor(protected productService: ProductService) {}

  @Post()
  async createNewProduct(@Body() product: Product) {
    try {
      return this.productService.createProduct(product);
    } catch (error) {
      return 'Something was wrong';
    }
  }

  @Get()
  async getAll() {
    return this.productService.findAll();
  }
}
