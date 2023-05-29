import { IsEmail, IsString } from 'class-validator';

export class SigninDto {
	@IsEmail()
	readonly email: string;

	@IsString()
	readonly password: string;
}
