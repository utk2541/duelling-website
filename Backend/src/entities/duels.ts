import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { dproblem } from "./allProblems";
@Entity()
export class duels {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  duelistA: string;

  @Column()
  duelistB: string;

  @Column()
  status: string;

  @Column("jsonb", { array: false })
  problems: Array<dproblem>;

  @Column()
  minRating: number;

  @Column()
  maxRating: number;
}
