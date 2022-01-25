import { Body, Controller, Post } from '@nestjs/common';
import { User } from 'src/users/user.model';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('login')
  async userSignIn(@Body() user: User) {
    return this.authService.userSignIn(user);
  }
}
