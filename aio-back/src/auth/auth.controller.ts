import { Body, Controller, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { Public } from '../common/decorators/public.decorator';
import { JwtPayload } from './dto/jwt.dto';
import { Register } from '../otp/dto/register.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('register')
	@Public()
	@ApiResponse({
		status: 200,
		type: JwtPayload,
	})
	async register(@Body() register: Register) {
		return await this.authService.register(register);
	}
}
