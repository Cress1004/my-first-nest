import { IsString, MaxLength, MinLength } from 'class-validator';
export class CreateTaskDto {
  @IsString()
  @MinLength(1)
  @MaxLength(32)
  readonly name!: string;
  @IsString()
  @MinLength(8)
  @MaxLength(64)
  readonly description!: string;
  @IsString()
  readonly assigneeId!: string;
}
