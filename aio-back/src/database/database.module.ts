import { Module, DynamicModule } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { DatabaseSeederService } from "./database.seeder.service";

@Module({})
export class DatabaseModule {
	static forRoot(): DynamicModule {
		return {
			module: DatabaseModule,
			imports: [
				TypeOrmModule.forRootAsync({
					imports: [ConfigModule],
					inject: [ConfigService],
					useFactory: (config: ConfigService) => {
						const dbConfig = config.get("database");
						return dbConfig;
					},
				}),
			],
			providers: [
				...(process.env.NODE_ENV === "development"
					? [DatabaseSeederService]
					: []),
			],
			exports: [TypeOrmModule],
		};
	}
}
