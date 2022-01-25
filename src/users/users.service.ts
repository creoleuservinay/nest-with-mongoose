import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.model';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async createUser(user: User) {
    const password = user.password;
    const hashedPassword = await bcrypt.hash(password, 12);

    return this.userModel.create({
      name: user.name,
      email: user.email,
      password: hashedPassword,
    });
  }

  async userLogin(user: User) {
    const findUser = await this.userModel.findOne({ email: user.email });
    if (!findUser) {
      throw new BadRequestException('Invalid credential');
    }
    if (!(await bcrypt.compare(user.password, findUser.password))) {
      throw new BadRequestException('Invalid credential');
    }

    return findUser;
  }
}
