import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../users/user.module';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';

import { AuthController } from './auth.controller';
import { LocalStrategy } from './strategies/local.strategy';
import { OtpModule } from '../otp/otp.module';

@Module({
	imports: [
		JwtModule.register({
			secret: process.env.JWT_KEY,
			signOptions: { expiresIn: '60d' },
		}),
		UsersModule,
		PassportModule,
		OtpModule,
	],
	providers: [JwtStrategy, AuthService, OtpModule, LocalStrategy],
	controllers: [AuthController],
})
export class AuthModule {}
