import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ErrorMessages } from "../common/errors/errorMessage";
import { User } from "./entities/user.entity";
import { RegisterDto } from "./dto/register.dto";
import { Otp } from "../otp/entities/otp.entity";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(User) private readonly userRepository: Repository<User>,
		@InjectRepository(Otp) private readonly otpRepository: Repository<Otp>,
		private jwtService: JwtService,
	) {}

	findOne(id: string) {
		return this.userRepository.findOne({
			where: { id },
		});
	}

	async findUserByPhoneNumber(phoneNumber: string) {
		return this.userRepository.findOne({
			where: { phoneNumber },
		});
	}

	async register(register: RegisterDto) {
		const { firstName, lastName, terms, phoneNumber } = register;

		const existingUser: User = await this.findUserByPhoneNumber(phoneNumber);

		if (existingUser?.isFullyRegistered)
			throw new BadRequestException(ErrorMessages.UserAlreadyExists);

		const newUser = {
			firstName,
			lastName,
			phoneNumber,
			terms,
			isFullyRegistered: true,
		} as User;

		await this.userRepository.save(newUser);
		return {
			isUserRegistered: true,
			access_token: this.jwtService.sign(
				newUser,
				{
					secret: process.env.JWT_KEY,
				},
			),
		};
	}
}