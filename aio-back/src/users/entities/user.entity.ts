import {
	Column,
	Entity,
	PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class User {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column({ nullable: true })
	firstName?: string;

	@Column({ nullable: true })
	lastName?: string;

	@Column({ nullable: true })
	terms: boolean;

	@Column({ nullable: false })
	phoneNumber?: string;

	@Column({ nullable: true })
	isFullyRegistered: boolean;

	// @ManyToMany(() => Business)
	// @JoinTable()
	// favoriteBusinesses: Business[];
}