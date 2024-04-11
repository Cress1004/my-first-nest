import { UsersService } from './users.service';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { UserInfDto } from './dto/user-info.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get()
  getAllUsers() {
    return this.usersService.getAllUsers();
  }

  @Get('/:username')
  @UseGuards(AuthGuard('jwt'))
  getUserByID(@Param('username') username: string) {
    return this.usersService.getUserByUserName(username);
  }

  @Post()
  create(@Body(ValidationPipe) user: UserInfDto) {
    return this.usersService.create(user);
  }
}
