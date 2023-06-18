import { Injectable } from "@nestjs/common";
import { VerifyOtp } from "./dto/verifyOtp.dto";
import { CreateOtp } from "./dto/createOtp.dto";
import { TwilioService } from "./twilio.service";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "../users/user.service";

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
	}

	async verifyCheck(verifyOtp: VerifyOtp) {
		const { phoneNumber, otpCode } = verifyOtp;
		let verificationCheckInstance;
		try {
			verificationCheckInstance = await this.twilioService.verifyCheck(
				phoneNumber,
				otpCode,
			);
		} catch (ex) {
			console.log(ex);
			throw ex;
		}

		if (!verificationCheckInstance.status) return false;

		let user = null;

		try {
			user = await this.userService.findUserByPhoneNumber(phoneNumber);
		} catch (ex) {
			console.log(ex);
		}

		let payload = null;

		if (user) {
			payload = {
				...payload,
				user,
			};
		} else { 
			payload = { 
				...payload,
				user: { 
					id: null,
					phoneNumber: phoneNumber
				}
			}
		}

		return {
			isUserRegistered: payload !== null,
			access_token: this.jwtService.sign(payload, {
				secret: process.env.JWT_KEY,
			}),
		};
	}
}