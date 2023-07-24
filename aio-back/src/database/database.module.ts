import { Module, DynamicModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseSeederService } from './database.seeder.service';
import { User } from '../users/entities/user.entity';
import { Business } from '../business/entities/business.entity';
import { Category } from '../category/entities/category.entity';
import { TermsOfUse } from '../terms-of-use/entities/terms-of-use.entity';

@Module({})
export class DatabaseModule {
	static forRoot(): DynamicModule {
		return {
			module: DatabaseModule,
			imports: [
				ConfigModule,
				TypeOrmModule.forRootAsync({
					imports: [ConfigModule],
					inject: [ConfigService],
					useFactory: (config: ConfigService) => {
						const dbConfig = config.get('database');
						return dbConfig;
					},
				}),
				TypeOrmModule.forFeature([User, Business, Category, TermsOfUse]), // Include your entities here
			],
			providers: [
				...((process.env.NODE_ENV || 'development') === 'development'
					? [DatabaseSeederService]
					: []),
			],
			exports: [TypeOrmModule],
		};
	}
}
