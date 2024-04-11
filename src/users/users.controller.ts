import { UsersService } from './users.service';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { UserInfDto } from './dto/user-info.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get()
  getAllUsers() {
    return this.usersService.getAllUsers();
  }

  @Get('/:id')
  getUserByID(@Param('id') id: string) {
    return this.usersService.getUserByID(id);
  }

  @Post()
  create(@Body(ValidationPipe) user: UserInfDto) {
    return this.usersService.create(user);
  }
}
