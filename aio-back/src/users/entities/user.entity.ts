import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column({ nullable: true })
	firstName?: string;

	@Column({ nullable: true })
	lastName?: string;

	// TODO: change to termsAccepted and add date to terms accepted
	@Column({ nullable: true })
	terms: boolean;

	@Column({ nullable: false })
	phoneNumber?: string;

	// TODO: remove is fully registered
	@Column({ nullable: true })
	isFullyRegistered: boolean;

	// @ManyToMany(() => Business)
	// @JoinTable()
	// favoriteBusinesses: Business[];
}
