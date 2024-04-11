import { UsersService } from 'src/users/users.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserInfDto } from 'src/users/dto/user-info.dto';
import * as bcrypt from 'bcryptjs';
@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}
  async checkUserExist({ username, password }: UserInfDto) {
    const user = await this.usersService.getUserByUserName(username);
    const isValid = await bcrypt.compare(password, user?.password);
    if (!isValid) {
      throw new UnauthorizedException('Invalid Credential');
    }
    return isValid;
  }
  async login(userInfo: UserInfDto) {
    if (await this.checkUserExist(userInfo)) {
      const payload = { userName: userInfo.username };
      return {
        access_token: this.jwtService.sign(payload, {
          secret: 'secret-key-exa',
        }),
      };
    }
  }
}
