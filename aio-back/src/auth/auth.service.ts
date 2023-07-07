import { Injectable } from "@nestjs/common";
import { UserService } from "../users/user.service";
import { RegisterDto } from "../users/dto/register.dto";

@Injectable()
export class AuthService {
	constructor(private readonly userService: UserService) {}

	async register(register: RegisterDto) {
		const { firstName, lastName, phoneNumber, terms } = register;
		const registerDto: RegisterDto = {
			firstName,
			lastName,
			phoneNumber,
			terms,
		};
		return this.userService.register(registerDto);
	}
}
