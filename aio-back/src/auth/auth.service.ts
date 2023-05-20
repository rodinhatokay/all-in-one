import { Injectable } from '@nestjs/common';
import { OtpService } from '../otp/otp.service';
import { Register } from '../otp/dto/register.dto';
import { UserService } from '../users/user.service';
<<<<<<< HEAD
import { RegisterDto } from '../users/dto/register.dto';
=======
>>>>>>> main

@Injectable()
export class AuthService {
  constructor(
    private readonly otpService: OtpService,
    private readonly userService: UserService,
  ) {}

  async register(register: Register) {
<<<<<<< HEAD
    const { firstName, lastName, phoneNumber, terms } = register;

    const otp = await this.otpService.getOtp(phoneNumber);

    const registerDto = { firstName, lastName, otp, terms } as RegisterDto;
    await this.userService.fullRegistration(registerDto);
=======
    const { firstName, lastName, phoneNumber } = register;
    const otp = await this.otpService.getOtp(phoneNumber);

    const payload = {
      firstName,
      lastName,
      otp,
    };

    return await this.userService.create(payload);
>>>>>>> main
  }
}
