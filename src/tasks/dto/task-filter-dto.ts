import { IsEnum, IsOptional, IsString } from 'class-validator';
import { TaskStatus } from '../task-status.enum';
export class TaskFilterDto {
  @IsString()
  @IsOptional()
  readonly assigneeId!: string;
  @IsEnum(TaskStatus)
  @IsOptional()
  readonly status!: TaskStatus;
  @IsString()
  @IsOptional()
  readonly search!: string;
}
