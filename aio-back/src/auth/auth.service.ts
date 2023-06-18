import { Injectable } from "@nestjs/common";
import { Register } from "../otp/dto/register.dto";
import { UserService } from "../users/user.service";
import { RegisterDto } from "../users/dto/register.dto";

@Injectable()
export class AuthService {
	constructor(private readonly userService: UserService) {}

	async register(register: Register) {
		const { firstName, lastName, phoneNumber, terms } = register;

		const registerDto = {
			firstName,
			lastName,
			phoneNumber,
			terms,
		} as RegisterDto;
		return this.userService.register(registerDto);
	}
}