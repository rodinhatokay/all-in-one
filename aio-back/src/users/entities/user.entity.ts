import { Column, Entity, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';
import { Business } from '../../business/entities/business.entity';

@Entity()
export class User {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({ nullable: true })
	firstName?: string;

	@Column({ nullable: true })
	lastName?: string;

	/**
	 * TODO: remove terms from here and store into seperate table,
	 * TODO: that holds userId, id of the termsOfContent and timestamp when it accepted
	 */
	@Column({ nullable: true })
	terms: boolean;

	@Column({ nullable: false })
	phoneNumber?: string;

	// TODO: remove is fully registered
	@Column({ nullable: true })
	isFullyRegistered: boolean;

	@ManyToMany(() => Business)
	@JoinTable()
	favoriteBusinesses: Business[];
}

