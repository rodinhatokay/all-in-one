import {
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
} from "typeorm";
import { Location } from "./location.entity";
import { OpeningHours } from "../../common/entities/openingHours.entity";
import { Category } from "../../category/entities/category.entity";

@Entity()
export class Business {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column({ unique: true })
	name: string;

	@Column()
	address: string;

	@Column()
	logoPath: string;

	@Column()
	description: string;

	@Column()
	phoneNumber: string;

	@Column()
	hasWhatsapp: boolean;

	@Column(() => Location)
	location: Location;

	@OneToMany(() => OpeningHours, (openingHours) => openingHours.business, {
		cascade: true,
		eager: true,
	})
	openingHours: OpeningHours[];

	@ManyToOne(() => Category)
	@JoinColumn({ name: "categoryId" })
	category: Category;

	// @ManyToMany(() => User, (user) => user.favoriteBusinesses)
	// users: User[];
}