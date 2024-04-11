import { Column, Entity } from 'typeorm';

@Entity()
export class JwtPayload {
  @Column()
  userName: string;
}
