import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/users/user.model';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtservice: JwtService,
  ) {}

  async userSignIn(user: User) {
    const findUser = await this.userModel.findOne({ email: user.email });
    if (!findUser) {
      throw new BadRequestException('Invalid credential');
    }
    if (!(await bcrypt.compare(user.password, findUser.password))) {
      throw new BadRequestException('Invalid credential');
    }

    const payload = { id: findUser._id };
    const token = await this.jwtservice.sign(payload);

    return { token };
  }
}
