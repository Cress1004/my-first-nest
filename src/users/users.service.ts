import { Injectable } from '@nestjs/common';
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

  getAllUsers(): Promise<User[]> {
    return this.usersRepository.find();
  }
}

// test(user: UsersService) {
//   console.log(user);
//   return user;
// }
//   findAll(): Promise<User[]> {
//     return this.usersRepository.find();
//   }

//   findOne(id: number): Promise<User> {
//     return this.usersRepository.findOneBy({ id });
//   }

//   async remove(id: string): Promise<void> {
//     await this.usersRepository.delete(id);
//   }
// }
// }
