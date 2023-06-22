import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Business } from "../../business/entities/business.entity";
import { DayOfWeek } from "../dto/days-of-week.dto";

@Entity()
export class OpeningHours {
	@PrimaryGeneratedColumn()
	id: number;
    
	@Column()
	day: DayOfWeek;

	@Column("jsonb")
	hours: { start: string; end: string }[];

	@ManyToOne(() => Business, (business) => business.openingHours)
	business: Business;
}