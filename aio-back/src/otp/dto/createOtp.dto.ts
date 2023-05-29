import { IsString } from 'class-validator';

export class CreateOtp {
	@IsString()
	phoneNumber: string;

	@IsString()
	channel: 'sms' | 'whatsapp';
}
