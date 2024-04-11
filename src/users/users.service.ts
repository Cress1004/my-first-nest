import { Injectable, NotFoundException } from '@nestjs/common';
import { UserInfDto } from './dto/user-info.dto';
import { User } from './entiry/users.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bycrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async create(user: UserInfDto) {
    const newUser = this.usersRepository.create({
      userName: user.username,
      password: await bycrypt.hash(user.password, 12),
    });
    return await this.usersRepository.save(newUser);
  }

  async getAllUsers(): Promise<User[]> {
    return await this.usersRepository.find();
  }
  async getUserByID(id: string): Promise<User | null> {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('Could not find user');
    }
    return user;
  }
  async getUserByUserName(userName: string): Promise<User | null> {
    const user = await this.usersRepository.findOneBy({ userName });
    if (!user) {
      throw new NotFoundException('Could not find user');
    }
    return user;
  }
}
