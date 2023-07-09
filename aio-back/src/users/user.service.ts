import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ErrorMessages } from "../common/errors/errorMessage";
import { User } from "./entities/user.entity";
import { RegisterDto } from "../auth/dto/req/register.dto";
import { Otp } from "../otp/entities/otp.entity";
import { JwtService } from "@nestjs/jwt";
import { JwtPayload } from "../auth/types/jwt";

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
		const { firstName, lastName, termsAccepted, phoneNumber } = register;

		const existingUser: User = await this.findUserByPhoneNumber(phoneNumber);

		if (existingUser?.isFullyRegistered)
			throw new BadRequestException(ErrorMessages.UserAlreadyExists);

		const newUser = {
			firstName,
			lastName,
			phoneNumber,
			terms: termsAccepted,
			isFullyRegistered: true,
		} as User;

		const user = await this.userRepository.save(newUser);

		const jwtPayload: JwtPayload = {
			phoneNumber: user.phoneNumber,
			userId: user.id,
		};

		const access_token = this.jwtService.sign(jwtPayload, {
			secret: process.env.JWT_KEY,
		});
		return {
			access_token,
			user,
		};
	}
}
