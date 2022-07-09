import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class duelists{

  @PrimaryGeneratedColumn()
  id!: number;

  @Column({unique:true})
  cfhandle: string;

  @Column("integer",{default:1500})
  duelRating: number = 1500;

  @Column("integer")
  cfRating: number;

  @Column()
  pfp: string;

}