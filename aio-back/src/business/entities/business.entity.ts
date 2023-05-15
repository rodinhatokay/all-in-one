import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Category } from '../../common/entities/category.entity';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Business {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column()
  phoneNumber: string;

  @Column({ unique: false })
  categoryId: string;

  @OneToOne(() => Category)
  @JoinColumn({ name: 'categoryId' })
  category: Category;

  @ManyToMany(() => User, (user) => user.favoriteBusinesses)
  users: User[];
}
