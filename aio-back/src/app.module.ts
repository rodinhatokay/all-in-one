import * as Joi from "@hapi/joi";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { CommonModule } from "./common/common.module";
import appConfig from "./config/app.config";
import { UsersModule } from "./users/user.module";
import { AuthModule } from "./auth/auth.module";
import { APP_GUARD } from "@nestjs/core";
import { JwtAuthGuard } from "./auth/guards/jwt-auth.guard";
import { User } from "./users/entities/user.entity";
import { Otp } from "./otp/entities/otp.entity";
import { readFileSync } from "fs";
import { join } from "path";
import { BusinessModule } from "./business/business.module";
import { Business } from "./business/entities/business.entity";
import { Location } from "./business/entities/location.entity";
import { OpeningHours } from "./common/entities/openingHours.entity";

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
						// TODO: comment SSL in local mode
						ca: readFileSync("/etc/ssl/certs/ca-certificate.crt"),
					},
					migrationsRun: configService.get("database.migrationsRun", true),
					entities: [User, Otp, Business, Location, OpeningHours],
					migrations: [join(__dirname, "/src/migrations/*.js")],
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
