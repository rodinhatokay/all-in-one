import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { Public } from "../common/decorators/public.decorator";
import { RegisterDto } from "../otp/dto/register.dto";

import { JwtAuthToRegisterGuard } from "./guards/jwt-auth-to-register.guard";
import { RegisterResponseDto } from "./dto/resp/registerDto";

@ApiTags("auth")
@Controller("auth")
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	// ? maybe move this to user controller? since it registers user, i think it makes more sense
	@Post("register")
	@Public()
	@UseGuards(JwtAuthToRegisterGuard) // anyone authed with phone number can register
	@ApiResponse({
		status: 200,
		type: RegisterResponseDto,
	})
	async register(@Body() register: RegisterDto): Promise<RegisterResponseDto> {
		return await this.authService.register(register);
	}
}
