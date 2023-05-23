import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ErrorMessages } from '../common/errors/errorMessage';
import { User } from './entities/user.entity';
import { RegisterDto } from './dto/register.dto';
import { Otp } from '../otp/entities/otp.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Otp) private readonly otpRepository: Repository<Otp>,
  ) {}

  findOne(id: string) {
    return this.userRepository.findOne({
      where: { id },
    });
  }

  async initialRegistration(phoneNumber: string, channel: 'sms' | 'whatsapp') {
    const existingUser: User = await this.userRepository.findOne({
      where: {
        otp: { phoneNumber: phoneNumber },
      },
      relations: ['otp'],
    });

    if (
      existingUser &&
      !existingUser.firstName &&
      !existingUser.lastName &&
      existingUser.otp.status === 'pending'
    ) {
      return;
    }

    const otp = {
      phoneNumber,
      channel,
      status: 'pending',
    } as Otp;

    const user = {
      firstName: null,
      lastName: null,
      terms: false,
      otp,
    };

    await this.otpRepository.save(otp);
    await this.userRepository.save(user);
  }

  async fullRegistration(register: RegisterDto) {
    const existingUser: User = await this.userRepository.findOne({
      where: {
        otp: { phoneNumber: register.otp.phoneNumber },
      },
    });

    if (existingUser && (existingUser.firstName || existingUser.lastName))
      throw new BadRequestException(ErrorMessages.UserAlreadyExists);

    const { firstName, lastName, terms, otp } = register;

    const otpToUpdate = {
      ...otp,
      status: otp.status,
    } as Otp;

    await this.otpRepository.update(otpToUpdate.id, otpToUpdate);

    const userToUpdate = {
      ...existingUser,
      firstName,
      lastName,
      terms,
      otp: otpToUpdate,
    } as User;

    return await this.userRepository.update(userToUpdate.id, userToUpdate);
  }

  async updateOtpStatus(phoneNumber: string, status: string) {
    const existingUser: User = await this.userRepository.findOne({
      where: {
        otp: { phoneNumber: phoneNumber },
      },
      relations: ['otp'],
    });

    if (!existingUser)
      throw new BadRequestException(ErrorMessages.UserDoesNotExists);

    existingUser.otp.status = status;
    await this.otpRepository.update(existingUser.otp.id, existingUser.otp);
  }

  async getOtp(phoneNumber: string): Promise<Otp> {
    const user: User = await this.userRepository.findOne({
      where: {
        otp: { phoneNumber: phoneNumber },
      },
      relations: ['otp'],
    });

    return user?.otp;
  }
}
