import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task-dto';
import { TaskStatus } from './task-status.enum';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}
  @Post()
  createNewTask(@Body(ValidationPipe) task: CreateTaskDto) {
    return this.tasksService.create(task);
  }
  @UsePipes(new ValidationPipe({ transform: true }))
  @Get()
  getTasksByParams(
    @Query('assigneeId') assigneeId: string,
    @Query('status') status: TaskStatus,
    @Query('search') search: string,
  ) {
    return this.tasksService.filterTask({
      assigneeId: assigneeId,
      status: status,
      search: search,
    });
  }
}
