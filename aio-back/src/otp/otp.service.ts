import { Injectable } from "@nestjs/common";
import { VerifyOtp } from "./dto/verifyOtp.dto";
import { CreateOtp } from "./dto/createOtp.dto";
import { TwilioService } from "./twilio.service";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "../users/user.service";
import { Otp } from "./entities/otp.entity";

@Injectable()
export class OtpService {
	constructor(
		private twilioService: TwilioService,
		private jwtService: JwtService,
		private userService: UserService,
	) {}

	async createOtp(createOtp: CreateOtp): Promise<void> {
		const { phoneNumber, channel } = createOtp;
		await this.twilioService.getOtp(phoneNumber, channel);
		await this.userService.initialRegistration(phoneNumber, channel);
	}

	async verifyCheck(verifyOtp: VerifyOtp) {
		const { phoneNumber, otpCode } = verifyOtp;
		const verificationCheckInstance = await this.twilioService.verifyCheck(
			phoneNumber,
			otpCode,
		);

		if (!verificationCheckInstance.status) return false;

		await this.userService.updateOtpStatus(phoneNumber, "approved");

		return {
			access_token: this.jwtService.sign(
				{ verifyOtp },
				{
					secret: process.env.JWT_KEY,
				},
			),
		};
	}

	async getOtp(phoneNumber: string): Promise<Otp> {
		return await this.userService.getOtp(phoneNumber);
	}
}
