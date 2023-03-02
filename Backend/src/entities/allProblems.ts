import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
export class problem {
  name: string;
  index: string;
  contestId: string;
  
  constructor(val : allProblems){
    this.name = val.name;
    this.contestId=val.contestId;
    this.index = val.index;
  }
}
export class dproblem  {
  name: string;
  index: string;
  contestId: string;
  solvedBy: string;
  constructor(val : problem){
    this.name = val.name;
    this.index = val.index;
    this.solvedBy = "none";
    this.contestId=val.contestId;
    
  }
}
@Entity()
export class allProblems {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  contestId: string;

  @Column()
  index: string;

  @Column()
  name: string;

  @Column("text", { array: true, nullable: true })
  tags: string[];

  @Column("int", { nullable: true })
  rating: number;
}
