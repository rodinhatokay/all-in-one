import { Injectable } from "@nestjs/common";
import { UserService } from "../users/user.service";
import { RegisterDto } from "./dto/req/register.dto";

@Injectable()
export class AuthService {
	constructor(private readonly userService: UserService) {}

	async register(register: RegisterDto) {
		const { firstName, lastName, phoneNumber, termsAccepted } = register;
		const registerDto: RegisterDto = {
			firstName,
			lastName,
			phoneNumber,
			termsAccepted,
		};
		return this.userService.register(registerDto);
	}
}
