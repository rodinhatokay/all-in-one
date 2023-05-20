import { IsString } from 'class-validator';
import { Otp } from '../../otp/entities/otp.entity';

export class RegisterDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  otp: Otp;
}
