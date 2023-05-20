import { IsString } from 'class-validator';

export class VerifyOtp {
  @IsString()
  phoneNumber: string;

  @IsString()
  otpCode: string;
}
