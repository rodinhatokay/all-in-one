import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Language } from '../../common/constants/langauges';

@Entity({
	name: 'terms_of_use',
})
export class TermsOfUse {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	content: string;

	@Column({
		type: 'enum',
		enum: Language,
		default: Language.ENGLISH,
	})
	language: Language;

	@Column({
		type: 'timestamp',
		default: () => 'CURRENT_TIMESTAMP', // Set the default value to the current timestamp when the row is inserted/updated
		onUpdate: 'CURRENT_TIMESTAMP', // Update the value to the current timestamp whenever the row is updated
	})
	modifiedAt: Date;
}
