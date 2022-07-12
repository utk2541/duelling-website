import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class duels{

  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  duelistA: string;

  @Column()
  duelistB: string;

  @Column()
  status: string;

  @Column("jsonb",{array:false})
  problems: Array<{contestId: string,index: string,name: string}>;

  @Column("date")
  startdate: Date;

  @Column("time")
  starttime: Date;

  @Column("integer")
  duration: number;

  @Column("integer",{default:0})
  PointsA: number;	
  
  @Column("integer",{default:0})	
  PointsB: number;

  @Column()
  winner: string;

  @Column()
  delA: number;

  @Column()
  delB: number;


}