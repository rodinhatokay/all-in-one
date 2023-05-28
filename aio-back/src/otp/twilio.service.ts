import { Injectable } from '@nestjs/common';
import { Twilio } from 'twilio';
import { VerificationCheckInstance } from 'twilio/lib/rest/verify/v2/service/verificationCheck';

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const verifySid = 'VA63336fe4af56409b8db076b5337cca20';

@Injectable()
export class TwilioService {
	private client: Twilio;
	constructor() {
		this.client = new Twilio(accountSid, authToken);
	}

	async verify(phoneNumber: string, channel = 'sms'): Promise<void> {
		const verification = await this.client.verify.v2
			.services(verifySid)
			.verifications.create({ to: phoneNumber, channel: channel });

		console.log(`[${phoneNumber}]: ${verification.status}`);
	}

	async verifyCheck(
		phoneNumber: string,
		otpCode: string,
	): Promise<VerificationCheckInstance> {
		const verificationCheck = await this.client.verify.v2
			.services(verifySid)
			.verificationChecks.create({ to: phoneNumber, code: otpCode });
		console.log(`[${phoneNumber}]: ${verificationCheck.status}`);

		return verificationCheck;
	}
}
