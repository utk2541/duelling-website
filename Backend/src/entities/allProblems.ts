import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class allProblems{

  @PrimaryGeneratedColumn()
  id!: number;


  @Column()
  contestId: string;
  
  @Column()
  index: string;

  @Column()
  name: string;

  @Column("text",{array:true , nullable:true})
  tags: string[];

  @Column("int",{nullable:true})
  rating: number;


}