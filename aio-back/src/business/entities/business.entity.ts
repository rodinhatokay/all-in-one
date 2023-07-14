import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Location } from "./location.entity";
import { OpeningHours } from "../../common/entities/openingHours.entity";

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

	// @Column({ unique: false })
	// categoryId: string;

	// @ManyToOne(() => Category)
	// @JoinColumn({ name: "categoryId" })
	// category: Category;

	// @ManyToMany(() => User, (user) => user.favoriteBusinesses)
	// users: User[];
}
