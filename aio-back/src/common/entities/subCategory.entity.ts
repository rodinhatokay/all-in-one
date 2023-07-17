import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
// import { Category } from './category.entity';

@Entity()
export class SubCategory {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({ unique: true })
	name: string;

	@Column()
	categoryId: string;

	// @ManyToOne(() => Category, (category) => category.subCategories)
	// category: Category;
}
