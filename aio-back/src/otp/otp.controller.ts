import { Body, Controller, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Public } from '../common/decorators/public.decorator';
import { VerifyOtp } from './dto/verifyOtp.dto';
import { CreateOtp } from './dto/createOtp.dto';
import { OtpService } from './otp.service';
import { JwtPayload } from '../auth/dto/jwt.dto';

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
    return await this.otpService.createOtp(createOtp);
  }

  @Post('verify')
  @Public()
  @ApiResponse({
    status: 200,
    type: JwtPayload,
  })
  async verifyOtp(@Body() verifyOtp: VerifyOtp) {
    return await this.otpService.verifyOtp(verifyOtp);
  }
}
