import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Public } from '../common/decorators/public.decorator';
import { VerifyOtp } from './dto/verifyOtp.dto';
import { CreateOtp } from './dto/createOtp.dto';
import { OtpService } from './otp.service';
import { JwtPayload } from '../auth/dto/jwt.dto';
import { ErrorMessages } from '../common/errors/errorMessage';

@ApiTags('otp')
@Controller('otp')
export class OtpController {
	constructor(private readonly otpService: OtpService) {}

	@Post('create')
	@Public()
	@ApiResponse({
		status: 200,
		type: String,
	})
	async createOtp(@Body() createOtp: CreateOtp) {
		try {
			await this.otpService.createOtp(createOtp);
		} catch (error) {
			if (error.status === 400) {
				throw new BadRequestException(ErrorMessages.InvalidPhoneNumber);
			}
		}
	}

	@Post('verify')
	@Public()
	@ApiResponse({
		status: 200,
		type: JwtPayload,
	})
	async verifyOtp(@Body() verifyOtp: VerifyOtp) {
		try {
			const payload = await this.otpService.verifyCheck(verifyOtp);
			if (!payload) {
				throw new BadRequestException(ErrorMessages.invalidOtpCode);
			}
			return payload;
		} catch (err) {
			if (err.status === 404 || err.status === 400) {
				throw new BadRequestException(ErrorMessages.invalidOtpCode);
			} 
			throw err;
		}
	}
}
