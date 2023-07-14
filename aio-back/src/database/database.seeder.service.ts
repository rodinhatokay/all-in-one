import { Injectable, OnApplicationBootstrap } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { RegisterDto } from "../auth/dto/req/register.dto";
import { User } from "../users/entities/user.entity";

@Injectable()
export class DatabaseSeederService implements OnApplicationBootstrap {
	constructor(
		@InjectRepository(User)
		private readonly userRepository: Repository<User>,
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
		}
	}
}
