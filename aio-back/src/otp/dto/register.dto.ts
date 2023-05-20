<<<<<<< HEAD
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';
=======
import { IsNotEmpty, IsString } from 'class-validator';
>>>>>>> main

export class Register {
  @IsString()
  @IsNotEmpty()
  phoneNumber: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;

<<<<<<< HEAD
  @IsBoolean()
  @IsNotEmpty()
  terms: boolean;

=======
>>>>>>> main
  @IsString()
  @IsNotEmpty()
  lastName: string;
}
