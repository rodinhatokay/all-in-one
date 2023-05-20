<<<<<<< HEAD
import { IsBoolean, IsString } from 'class-validator';
=======
import { IsString } from 'class-validator';
>>>>>>> main
import { Otp } from '../../otp/entities/otp.entity';

export class RegisterDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

<<<<<<< HEAD
  @IsBoolean()
  terms: boolean;

=======
>>>>>>> main
  otp: Otp;
}
