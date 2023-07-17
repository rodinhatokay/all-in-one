import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
// import { SubCategory } from './subCategory.entity';

@Entity()
export class Category {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({ unique: true })
	name: string;

	// @OneToMany(() => SubCategory, (subCategory) => subCategory.category)
	// subCategories: SubCategory[];
}
