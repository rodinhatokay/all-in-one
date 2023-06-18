import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { Otp } from "../otp/entities/otp.entity";
import { JwtService } from "@nestjs/jwt";

@Module({
	imports: [TypeOrmModule.forFeature([User]), TypeOrmModule.forFeature([Otp])],
	providers: [UserService, JwtService],
	exports: [UserService, TypeOrmModule.forFeature([User])],
	controllers: [UserController],
})
export class UsersModule {}