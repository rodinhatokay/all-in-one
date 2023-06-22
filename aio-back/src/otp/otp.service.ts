import { BadRequestException, Injectable } from "@nestjs/common";
import { VerifyOtp } from "./dto/verifyOtp.dto";
import { CreateOtp } from "./dto/createOtp.dto";
import { TwilioService } from "./twilio.service";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "../users/user.service";
import { AccessTokenResponse } from "../auth/dto/resp/accessToken";
import { ErrorMessages } from "../common/errors/errorMessage";
import { JwtPayload } from "../auth/types/jwt";

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

	async verifyCheck(verifyOtp: VerifyOtp): Promise<AccessTokenResponse> {
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

		if (verificationCheckInstance.status !== "approved") {
			throw new BadRequestException(ErrorMessages.invalidOtpCode);
		}

		let userId: string | null = null;
		try {
			const user = await this.userService.findUserByPhoneNumber(phoneNumber);
			userId = user.id;
		} catch (ex) {
			console.log(ex);
		}

		const jwtPayload: JwtPayload = {
			phoneNumber,
			userId,
		};

		return {
			isUserRegistered: jwtPayload.userId !== null,
			access_token: this.jwtService.sign(jwtPayload, {
				secret: process.env.JWT_KEY,
			}),
		};
	}
}
