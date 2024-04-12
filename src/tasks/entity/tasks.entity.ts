import { Max, Min } from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { TaskStatus } from '../task-status.enum';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  @Min(1)
  @Max(32)
  name: string;

  @Column()
  @Min(1)
  @Max(64)
  description: string;

  @Column()
  assigneeId: string;

  @Column()
  status: TaskStatus;
}
