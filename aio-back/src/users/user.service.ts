import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ErrorMessages } from '../common/errors/errorMessage';
import { User } from './entities/user.entity';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  findOne(id: string) {
    return this.userRepository.findOne({
      where: { id },
    });
  }

  async create(register: RegisterDto) {
    const existingUser = await this.userRepository.findOne({
      where: {
        otp: { phoneNumber: register.otp.phoneNumber },
      },
    });

    if (existingUser)
      throw new BadRequestException(ErrorMessages.UserAlreadyExists);

    // create user and save
    const user = this.userRepository.create({
      firstName: register.firstName,
      lastName: register.lastName,
      otp: register.otp,
    });

    return await this.userRepository.save(user);
  }
}
