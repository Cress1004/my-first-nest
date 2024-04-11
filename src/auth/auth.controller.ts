import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { UserInfDto } from 'src/users/dto/user-info.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('login')
  login(@Body(ValidationPipe) userInfo: UserInfDto) {
    return this.authService.login(userInfo);
  }
}
