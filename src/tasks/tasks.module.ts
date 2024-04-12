import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './entity/tasks.entity';
import { User } from 'src/users/entiry/users.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  controllers: [TasksController],
  providers: [TasksService],
  imports: [TypeOrmModule.forFeature([User, Task]), UsersModule],
  exports: [TypeOrmModule, TasksService],
})
export class TasksModule {}
