import { Module } from '@nestjs/common';
import { OtpService } from './otp.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Otp } from './entities/otp.entity';
<<<<<<< HEAD
import { JwtService } from '@nestjs/jwt';
import { OtpController } from './otp.controller';
import { TwilioService } from './twilio.service';
import { UsersModule } from '../users/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Otp]), UsersModule],
  providers: [OtpService, TwilioService, JwtService],
  exports: [OtpService, TwilioService],
=======
import { JwtModule } from '@nestjs/jwt';
import { OtpController } from './otp.controller';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_KEY,
      signOptions: { expiresIn: '60d' },
    }),
    TypeOrmModule.forFeature([Otp]),
  ],
  providers: [OtpService],
  exports: [OtpService],
>>>>>>> main
  controllers: [OtpController],
})
export class OtpModule {}
