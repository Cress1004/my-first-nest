import { UsersService } from './users.service';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserInfDto } from './dto/user-info.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get()
  getAllUsers() {
    return this.usersService.getAllUsers();
  }

  @Post()
  create(@Body() user: UserInfDto) {
    return this.usersService.create(user);
  }

  @Get('test')
  test(@Body() user: UserInfDto) {
    return user;
  }
}
