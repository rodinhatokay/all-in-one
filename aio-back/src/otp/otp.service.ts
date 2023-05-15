import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Otp } from './entities/otp.entity';
import { Repository } from 'typeorm';
import { VerifyOtp } from './dto/verifyOtp.dto';
import { JwtService } from '@nestjs/jwt';
import { generateRandomSixDigitNumber } from './otp.utils';
import { CreateOtp } from './dto/createOtp.dto';

@Injectable()
export class OtpService {
  constructor(
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
    };
  }

  async getOtp(phoneNumber: string): Promise<Otp> {
    return await this.otpRepository.findOne({
      where: {
        phoneNumber,
      },
    });
  }
}
