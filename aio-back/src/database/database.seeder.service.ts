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
		@InjectRepository(Business)
		private readonly businessRepository: Repository<Business>,
	) {}

	async onApplicationBootstrap() {
		await this.seedBusinesses();
		await this.seedUsers();
	}

	private async seedBusinesses() {
		// BUILD BUSINESS

		const count = await this.businessRepository.count();
		if (count) return;

		console.log("RUNNING SEED BUSINESSES FOR DB");

		const businesses: CreateBusiness[] = [
			{
				name: "Fashion Emporium(Rodin)",
				description: "Trendy clothing store with a wide selection",
				phoneNumber: "+972524560793",
				logoPath: "https://avatars.githubusercontent.com/u/57593612?s=96&v=4",
				address: "Kfar Kama, abazkh 5",
				hasWhatsapp: true,
				location: {
					latitude: 50,
					longitude: 20,
				},
				openingHours: [
					{ day: "Sunday", hours: [{ start: "00:00", end: "04:00" }] },
					{ day: "Monday", hours: [{ start: "00:00", end: "04:00" }] },
					{ day: "Tuesday", hours: [{ start: "00:00", end: "04:00" }] },
					{ day: "Wednesday", hours: [{ start: "00:00", end: "04:00" }] },
					{ day: "Thursday", hours: [{ start: "00:00", end: "04:00" }] },
					{ day: "Friday", hours: [] },
					{ day: "Saturday", hours: [] },
				],
			},
			{
				name: "Wellness Spa(Aslan)",
				description: "Relaxing spa with various wellness treatments",
				phoneNumber: "+972509887021",
				logoPath: "https://avatars.githubusercontent.com/u/57593612?s=96&v=4",
				address: "Kfar Kama, Adiga 10",
				hasWhatsapp: false,
				location: {
					latitude: 50,
					longitude: 20,
				},
				openingHours: [
					{ day: "Sunday", hours: [{ start: "00:00", end: "04:00" }] },
					{
						day: "Monday",
						hours: [
							{ start: "00:00", end: "04:00" },
							{ start: "08:00", end: "12:00" },
						],
					},
					{ day: "Tuesday", hours: [{ start: "00:00", end: "04:00" }] },
					{
						day: "Wednesday",
						hours: [
							{ start: "00:00", end: "04:00" },
							{ start: "08:00", end: "12:00" },
							{ start: "15:00", end: "17:00" },
						],
					},
					{ day: "Thursday", hours: [{ start: "00:00", end: "04:00" }] },
					{ day: "Friday", hours: [] },
					{ day: "Saturday", hours: [] },
				],
			},
		];

		await this.businessRepository.save(businesses);
	}

	private async seedUsers() {
		const count = await this.userRepository.count();
		if (count) return;
		// No users in the database, let's seed!

		console.log("RUNNING SEED USER FOR DB");

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
	}
}
