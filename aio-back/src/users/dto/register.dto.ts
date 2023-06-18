import { IsBoolean, IsString } from 'class-validator';

export class RegisterDto {
	@IsString()
	firstName: string;

	@IsString()
	lastName: string;

	@IsBoolean()
	terms: boolean;

	@IsString()
	phoneNumber: string;
}
