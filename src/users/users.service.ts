import { Injectable, NotFoundException } from '@nestjs/common';
import { UserInfDto } from './dto/user-info.dto';
import { User } from './entiry/users.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}
  users: UserInfDto[] = [];
  async create(user: UserInfDto) {
    const newUser = this.usersRepository.create({
      userName: user.username,
      password: user.password,
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
}
