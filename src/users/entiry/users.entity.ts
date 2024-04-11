import { Max, Min } from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  @Min(1)
  @Max(32)
  userName: string;

  @Column()
  @Min(8)
  @Max(64)
  password: string;

  @Column({ default: true })
  isActive: boolean;
}
