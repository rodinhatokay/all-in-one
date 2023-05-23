import { IsBoolean, IsString } from 'class-validator';
import { Otp } from '../../otp/entities/otp.entity';

export class RegisterDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsBoolean()
  terms: boolean;

  otp: Otp;
}
