import * as Joi from '@hapi/joi';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CommonModule } from './common/common.module';
import appConfig from './config/app.config';
import { UsersModule } from './users/user.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { Business } from "./business/entities/business.entity";
import { Category } from "./common/entities/category.entity";
import { SubCategory } from "./common/entities/subCategory.entity";
import { User } from "./users/entities/user.entity";
import { Otp } from "./otp/entities/otp.entity";
import { CreateCategoryTable1679074427751 } from "./migrations/CreateCategoryTable-1679074427751";
import { AddCategories1679074427752 } from "./migrations/AddCategories-1679074427752";
import { readFileSync } from 'fs';
import { BusinessModule } from './business/business.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: async (configService: ConfigService) => {
				return {
					type: "postgres",
					host: configService.get("database.host", "127.0.0.1"),
					port: configService.get("database.port", 5432),
					username: configService.get("database.user", "postgres"),
					password: configService.get("database.pass", "pass123"),
					database: configService.get("database.db", "postgres"),
					ssl: {
						ca: readFileSync("/etc/ssl/certs/ca-certificate.crt"),
					},
					migrationsRun: configService.get("database.migrationsRun", false),
					entities: [Business, Category, SubCategory, User, Otp],
					migrations: [CreateCategoryTable1679074427751, AddCategories1679074427752],
				};
			},
		}),
    ConfigModule.forRoot({
			validationSchema: Joi.object({
				DATABASE_HOST: Joi.required(),
				DATABASE_PORT: Joi.number().default(5432),
				DATABASE_DB: Joi.required(),
				DATABASE_USER: Joi.required(),
				DATABASE_PASS: Joi.required(),
				TWILIO_ACCOUNT_SID: Joi.required(),
				TWILIO_AUTH_TOKEN: Joi.required(),
				JWT_KEY: Joi.required(),
			}),
			load: [appConfig],
		}),

    CommonModule,
    UsersModule,
    AuthModule,
    BusinessModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
