import { Injectable, OnApplicationBootstrap } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { RegisterDto } from "../auth/dto/req/register.dto";
import { User } from "../users/entities/user.entity";
import { CreateBusiness } from "../business/dto/createBusiness.dto";
import { Business } from "../business/entities/business.entity";

@Injectable()
export class DatabaseSeederService implements OnApplicationBootstrap {
	constructor(
		@InjectRepository(User)
		private readonly userRepository: Repository<User>,
		private readonly businessRepository: Repository<Business>,
	) {}

	async onApplicationBootstrap() {
		await this.seedUsers();
	}

	private async seedUsers() {
		const count = await this.userRepository.count();
		if (count === 0) {
			// No users in the database, let's seed!

			// TODO: create folder for seeding seperate of concerens
			const user1: RegisterDto = {
				firstName: "Rodin",
				lastName: "Hatokay",
				termsAccepted: true,
				phoneNumber: "+972524560793",
			};

			const user2: RegisterDto = {
				firstName: "Aslan",
				lastName: "Shapso",
				termsAccepted: true,
				phoneNumber: "+972509887021",
			};

			await this.userRepository.save(user1);
			await this.userRepository.save(user2);

			// BUILD BUSINESS

			const businesses: CreateBusiness[] = [
				{
					name: "Fashion Emporium(Rodin)",
					description: "Trendy clothing store with a wide selection",
					phoneNumber: "+972524560793",
					logoPath: "",
					hasWhatsapp: true,
					location: {
						latitude: 50,
						longitude: 20,
					},
					openingHours: [
						{ day: "Monday", hours: [{ start: "00:00", end: "04:00" }] },
						{ day: "Thursday", hours: [{ start: "00:00", end: "04:00" }] },
						{ day: "Wednesday", hours: [{ start: "00:00", end: "04:00" }] },
						{ day: "Tuesday", hours: [{ start: "00:00", end: "04:00" }] },
					],
				},
				{
					name: "Wellness Spa(Aslan)",
					description: "Relaxing spa with various wellness treatments",
					phoneNumber: "+972509887021",
					logoPath: "",
					hasWhatsapp: false,
					location: {
						latitude: 50,
						longitude: 20,
					},
					openingHours: [
						{ day: "Monday", hours: [{ start: "00:00", end: "04:00" }] },
						{ day: "Thursday", hours: [{ start: "00:00", end: "04:00" }] },
						{ day: "Wednesday", hours: [{ start: "00:00", end: "04:00" }] },
						{ day: "Tuesday", hours: [{ start: "00:00", end: "04:00" }] },
					],
				},
			];

			await this.businessRepository.save(businesses);
		}
	}
}
