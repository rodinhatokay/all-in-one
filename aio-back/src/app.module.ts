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
import { BusinessModule } from "./business/business.module";

@Module({
	imports: [
		TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: (config: ConfigService) => config.get("database"),
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