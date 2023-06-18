import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class Register {
	@IsString()
	@IsNotEmpty()
	phoneNumber: string;

	@IsString()
	@IsNotEmpty()
	firstName: string;

	@IsString()
	@IsNotEmpty()
	lastName: string;

	@IsBoolean()
	@IsNotEmpty()
	terms: boolean;
}
