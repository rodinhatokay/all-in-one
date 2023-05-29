import {
	Column,
	Entity,
	PrimaryGeneratedColumn,
	OneToOne,
	JoinColumn,
} from "typeorm";
import { Otp } from "../../otp/entities/otp.entity";

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

	@OneToOne(() => Otp)
	@JoinColumn()
	otp?: Otp;

	// @ManyToMany(() => Business)
	// @JoinTable()
	// favoriteBusinesses: Business[];
}
