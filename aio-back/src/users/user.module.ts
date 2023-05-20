import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';
<<<<<<< HEAD
import { Otp } from '../otp/entities/otp.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User]), TypeOrmModule.forFeature([Otp])],
  providers: [UserService],
  exports: [UserService, TypeOrmModule.forFeature([User])],
=======

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserService],
  exports: [UserService],
>>>>>>> main
  controllers: [UserController],
})
export class UsersModule {}
