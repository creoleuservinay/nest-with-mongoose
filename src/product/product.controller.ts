import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { RolesGuard } from 'src/guards/roles.guards';
import { Product } from './product.model';
import { ProductService } from './product.service';

@Controller('products')
@UseGuards(RolesGuard)
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

  @Get('greet')
  async GetGreetMessage() {
    return this.productService.returnGreet();
  }

  @Get()
  async getAll() {
    try {
      return this.productService.findAll();
    } catch (error) {
      throw new Error('Something wrong');
    }
  }
}
