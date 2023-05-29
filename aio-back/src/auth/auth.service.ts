import { Injectable } from '@nestjs/common';
import { OtpService } from '../otp/otp.service';
import { Register } from '../otp/dto/register.dto';
import { UserService } from '../users/user.service';
import { RegisterDto } from '../users/dto/register.dto';

@Injectable()
export class AuthService {
	constructor(
		private readonly otpService: OtpService,
		private readonly userService: UserService,
	) {}

	async register(register: Register) {
		const { firstName, lastName, phoneNumber, terms } = register;

		const otp = await this.otpService.getOtp(phoneNumber);

		const registerDto = { firstName, lastName, otp, terms } as RegisterDto;
		await this.userService.fullRegistration(registerDto);
	}
}
