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

  @Column("jsonb",{array:true})
  problems: {contestId: string,index: string}[];

  @Column("date")
  starttime: Date;

  @Column("date")
  endtime: Date;

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