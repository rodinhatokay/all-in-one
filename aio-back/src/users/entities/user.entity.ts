import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Otp } from '../../otp/entities/otp.entity';
import { Business } from '../../business/entities/business.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @OneToOne(() => Otp)
  @JoinColumn()
  otp: Otp;

  @ManyToMany(() => Business)
  @JoinTable()
  favoriteBusinesses: Business[];
}
