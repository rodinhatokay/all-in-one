import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BusinessService } from './business.service';
import { BusinessController } from './business.controller';
import { Business } from './entities/business.entity';
import { Location } from './entities/location.entity';
import { OpeningHours } from '../common/entities/openingHours.entity';
import { CacheService } from '../cache/cache.service';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
	imports: [
		TypeOrmModule.forFeature([Business, Location, OpeningHours]),
		CacheModule.register(),
	],
	providers: [BusinessService, CacheService],
	exports: [BusinessService],
	controllers: [BusinessController],
})
export class BusinessModule {}

