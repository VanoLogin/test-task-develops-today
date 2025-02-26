import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "../user/user.entity";

@Entity()
export class Holiday {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  date: string;

  @Column()
  countryCode: string;

  @ManyToOne(() => User, (user) => user.holidays)
  user: User;
}
