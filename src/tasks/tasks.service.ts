import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entity/tasks.entity';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task-dto';
import { TaskStatus } from './task-status.enum';
import { UsersService } from 'src/users/users.service';
import { TaskFilterDto } from './dto/task-filter-dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private taskRepository: Repository<Task>,
    private readonly userService: UsersService,
  ) {}
  async checkExistingUSer(userId: string) {
    const user = await this.userService.getUserByID(userId);
    if (!user) {
      return false;
    }
    return true;
  }

  checkExistingStatus(status: TaskStatus) {
    return Object.values(TaskStatus).includes(status);
  }

  async create(task: CreateTaskDto) {
    if (this.checkExistingUSer(task.assigneeId)) {
      const newTask = this.taskRepository.create({
        name: task.name,
        description: task.description,
        assigneeId: task.assigneeId,
        status: TaskStatus.NEW,
      });
      return await this.taskRepository.save(newTask);
    }
  }

  async filterTask(filterParams: TaskFilterDto): Promise<Task[]> {
    const assigneeId = filterParams?.assigneeId;
    const status = filterParams?.status;
    const search = filterParams?.search;
    const query = this.taskRepository.createQueryBuilder('task');
    if (assigneeId) {
      query.andWhere('task.assigneeId = :assigneeId', { assigneeId });
    }
    if (status) {
      query.andWhere('task.status = :status', { status });
    }
    if (search) {
      query.andWhere(
        'LOWER(task.name) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search)',
        { search: `%${search}%` },
      );
    }
    // query
    //   .orWhere('task.assigneeId = :assigneeId', { assigneeId })
    //   .orWhere('task.status = :status', { status })
    //   .orWhere(
    //     'LOWER(task.name) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search)',
    //     { search: `%${search}%` },
    //   );
    const tasks = await query.getMany();
    return tasks;


    // if (!assigneeId && !status) {
    //   return await this.taskRepository.find();
    // } else if (this.checkExistingUSer(assigneeId) && !status) {
    //   return await this.taskRepository.findBy({ status });
    // } else if (!assigneeId && this.checkExistingStatus(status)) {
    //   return await this.taskRepository.findBy({ assigneeId });
    // } else if (
    //   this.checkExistingStatus(status) &&
    //   this.checkExistingUSer(assigneeId)
    // ) {
    //   return await this.taskRepository.find({
    //     where: {
    //       assigneeId: filterParams.assigneeId,
    //       status: filterParams.status,
    //     },
    //   });
    // } else if (
    //   !this.checkExistingUSer(assigneeId) &&
    //   !this.checkExistingStatus(status)
    // ) {
    //   return [];
    // } else return [];
  }
}
