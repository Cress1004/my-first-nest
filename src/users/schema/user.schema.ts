import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserSchema {
  @PrimaryGeneratedColumn()
  id: {
    type: number;
    require: true;
    unique: true;
    primary: true;
    generated: true;
  };

  @Column()
  userName: {
    type: string;
    require: true;
  };

  @Column()
  password: {
    type: string;
    require: true;
  };

  @Column({ default: true })
  isActive: boolean;
}
