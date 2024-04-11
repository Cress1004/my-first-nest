import { IsString, MaxLength, MinLength } from 'class-validator';

export class UserInfDto {
  @IsString()
  @MinLength(1)
  @MaxLength(32)
  readonly username!: string;
  @IsString()
  @MinLength(8)
  @MaxLength(64)
  readonly password!: string;
}
