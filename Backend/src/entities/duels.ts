import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
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
  problems: Array<{ contestId: string; index: string; name: string }>;

  @Column()
  minRating: number;

  @Column()
  maxRating: number;
}
