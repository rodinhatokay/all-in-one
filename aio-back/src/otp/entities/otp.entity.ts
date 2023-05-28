import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
} from 'typeorm';

@Entity()
export class Otp {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	phoneNumber: string;

	@Column()
	status: string;

	@Column()
	channel: 'sms' | 'whatsapp';

	@CreateDateColumn({ type: 'timestamp' })
	createdAt: Date;

	@CreateDateColumn({ type: 'timestamp' })
	updatedAt: Date;
}
