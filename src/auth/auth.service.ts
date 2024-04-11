import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserInfDto } from 'src/users/dto/user-info.dto';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}
  async login(userInfo: UserInfDto) {
    const payload = { userName: userInfo.username };
    return {
      access_token: this.jwtService.sign(payload, { secret: 'secret-key-exa' }),
    };
  }
}
