import {
	Column,
	Entity,
	JoinColumn,
	ManyToMany,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { Category } from '../../common/entities/category.entity';
import { User } from '../../users/entities/user.entity';
import { ManyToOne } from 'typeorm';

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

	@ManyToOne(() => Category)
	@JoinColumn({ name: 'categoryId' })
	category: Category;

	// @ManyToMany(() => User, (user) => user.favoriteBusinesses)
	// users: User[];
}
