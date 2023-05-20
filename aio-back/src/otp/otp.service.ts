import { Injectable } from '@nestjs/common';
<<<<<<< HEAD
import { VerifyOtp } from './dto/verifyOtp.dto';
import { CreateOtp } from './dto/createOtp.dto';
import { TwilioService } from './twilio.service';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../users/user.service';
import { Otp } from './entities/otp.entity';
=======
import { InjectRepository } from '@nestjs/typeorm';
import { Otp } from './entities/otp.entity';
import { Repository } from 'typeorm';
import { VerifyOtp } from './dto/verifyOtp.dto';
import { JwtService } from '@nestjs/jwt';
import { generateRandomSixDigitNumber } from './otp.utils';
import { CreateOtp } from './dto/createOtp.dto';
>>>>>>> main

@Injectable()
export class OtpService {
  constructor(
<<<<<<< HEAD
    private twilioService: TwilioService,
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  async verify(createOtp: CreateOtp): Promise<void> {
    const { phoneNumber, channel } = createOtp;
    await this.userService.initialRegistration(phoneNumber, channel);
    await this.twilioService.verify(phoneNumber, channel);
  }

  async verifyCheck(verifyOtp: VerifyOtp) {
    const { phoneNumber, otpCode } = verifyOtp;
    const verificationCheckInstance = await this.twilioService.verifyCheck(
      phoneNumber,
      otpCode,
    );

    if (!verificationCheckInstance.status) return false;

    await this.userService.updateOtpStatus(phoneNumber, 'approved');

    return {
      access_token: this.jwtService.sign(
        { verifyOtp },
        {
          secret: process.env.JWT_KEY,
        },
      ),
=======
    @InjectRepository(Otp)
    private readonly otpRepository: Repository<Otp>,
    private jwtService: JwtService,
  ) {}

  async createOtp(createOtp: CreateOtp): Promise<string> {
    const { phoneNumber } = createOtp;

    const otpCode = generateRandomSixDigitNumber();
    const otp = this.otpRepository.create({
      phoneNumber,
      otpCode,
    });

    await this.otpRepository.save(otp);
    return otp.otpCode;
  }

  async verifyOtp(verifyOtp: VerifyOtp) {
    const { phoneNumber, otpCode } = verifyOtp;
    const otp = await this.otpRepository.findOne({
      where: {
        phoneNumber,
      },
    });

    if (otp.otpCode !== verifyOtp.otpCode) return false;

    const payload = {
      phoneNumber,
      otpCode,
    };

    return {
      access_token: this.jwtService.sign(payload, {
        secret: process.env.JWT_KEY,
      }),
>>>>>>> main
    };
  }

  async getOtp(phoneNumber: string): Promise<Otp> {
<<<<<<< HEAD
    return await this.userService.getOtp(phoneNumber);
=======
    return await this.otpRepository.findOne({
      where: {
        phoneNumber,
      },
    });
>>>>>>> main
  }
}
