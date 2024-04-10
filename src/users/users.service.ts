import { Injectable } from '@nestjs/common';
import { UserInfDto } from './dto/user-info.dto';

@Injectable()
export class UsersService {
  users: UserInfDto[] = [];

  test(user: UsersService) {
    console.log(user);
    return user;
  }

  create(user: UserInfDto) {
    this.users.push(user);
  }

  getAllUsers() {
    return this.users;
  }
}
