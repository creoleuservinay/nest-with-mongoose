import { Body, Controller, Post } from '@nestjs/common';
import { User } from './user.model';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(protected userService: UsersService) {}

  @Post('register')
  async userSingup(@Body() user: User) {
    return this.userService.createUser(user);
  }

  @Post('login')
  async userSignIn(@Body() user: User): Promise<User> {
    return this.userService.userLogin(user);
  }
}
