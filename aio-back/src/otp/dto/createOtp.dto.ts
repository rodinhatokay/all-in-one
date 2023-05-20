import { IsString } from 'class-validator';

export class CreateOtp {
  @IsString()
  phoneNumber: string;
<<<<<<< HEAD

  @IsString()
  channel: 'sms' | 'whatsapp';
=======
>>>>>>> main
}
