import { Injectable } from '@nestjs/common';
import { OtpService } from '../otp/otp.service';
import { Register } from '../otp/dto/register.dto';
import { UserService } from '../users/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly otpService: OtpService,
    private readonly userService: UserService,
  ) {}

  async register(register: Register) {
    const { firstName, lastName, phoneNumber } = register;
    const otp = await this.otpService.getOtp(phoneNumber);

    const payload = {
      firstName,
      lastName,
      otp,
    };

    return await this.userService.create(payload);
  }
}
