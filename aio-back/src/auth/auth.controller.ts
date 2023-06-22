import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { Public } from "../common/decorators/public.decorator";
import { Register } from "../otp/dto/register.dto";
import { AccessTokenResponse } from "./dto/resp/accessToken";
import { JwtAuthToRegisterGuard } from "./guards/jwt-auth-to-register.guard";

@ApiTags("auth")
@Controller("auth")
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post("register")
	@Public()
	@UseGuards(JwtAuthToRegisterGuard) // anyone authed with phone number can register
	@ApiResponse({
		status: 200,
		type: AccessTokenResponse,
	})
	async register(@Body() register: Register) {
		return await this.authService.register(register);
	}
}
