import * as Joi from "@hapi/joi";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule } from "@nestjs/config";
import { CommonModule } from "./common/common.module";
import appConfig from "./config/app.config";
import { UsersModule } from "./users/user.module";
import { AuthModule } from "./auth/auth.module";
import { APP_GUARD } from "@nestjs/core";
import { JwtAuthGuard } from "./auth/guards/jwt-auth.guard";
import { BusinessModule } from "./business/business.module";

console.log("process.env.DATABASE_HOSE", process.env.DATABASE_HOSE);

@Module({
	imports: [
		TypeOrmModule.forRootAsync({
			useFactory: () => ({
				type: "postgres",
				host: "127.0.0.1",
				post: 5432,
				username: "postgres",
				password: "pass123",
				database: "postgres",
				autoLoadEntities: true,
				synchronize: true,
			}),
		}),
		ConfigModule.forRoot({
			validationSchema: Joi.object({
				DATABASE_HOST: Joi.required(),
				DATABASE_PORT: Joi.number().default(5432),
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
