import {
	BadRequestException,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ErrorMessages } from '../common/errors/errorMessage';
import { User } from './entities/user.entity';
import { RegisterDto } from '../auth/dto/req/register.dto';
import { Otp } from '../otp/entities/otp.entity';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '../auth/types/jwt';

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(User) private readonly userRepository: Repository<User>,
		@InjectRepository(Otp) private readonly otpRepository: Repository<Otp>,
		private jwtService: JwtService,
	) {}

	async findOne(id: string) {
		const user = await this.userRepository.findOne({
			where: { id, isActive: true },
		});
		return user;
	}

	async findUserByPhoneNumber(phoneNumber: string) {
		const user = await this.userRepository.findOne({
			where: { phoneNumber, isActive: true },
		});
		return user;
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

	/**
	 * changes user data to
	 * @param id
	 */
	async deleteOne(id: string) {
		const user = await this.userRepository.findOne({
			where: { id, isActive: true },
		});
		if (!user) throw new NotFoundException(ErrorMessages.UserNotFound);
		user.isActive = false;
		await this.userRepository.save(user);
	}
}
