import { Module } from '@nestjs/common';
import { FavoriteBusinessController } from './favorite-business.controller';
import { FavoriteBusinessService } from './favorite-business.service';
import { Business } from '../business/entities/business.entity';
import { User } from '../users/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CacheModule } from '@nestjs/cache-manager';
import { CacheService } from '../cache/cache.service';

@Module({
	imports: [TypeOrmModule.forFeature([Business, User]), CacheModule.register()],
	providers: [FavoriteBusinessService, CacheService],
	exports: [FavoriteBusinessService],
	controllers: [FavoriteBusinessController],
})
export class FavoriteBusinessModule {}

