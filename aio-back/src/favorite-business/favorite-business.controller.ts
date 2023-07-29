import {
	Body,
	Controller,
	Get,
	Param,
	Post,
	Delete,
	UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { FavoriteBusinessService } from './favorite-business.service';
import { FavoriteBusiness } from './dto/favoriteBusiness.dto';

@ApiTags('favorite-businesses')
@Controller('favorite-businesses')
@UseGuards(JwtAuthGuard)
export class FavoriteBusinessController {
	constructor(
		private readonly favoriteBusinessService: FavoriteBusinessService,
	) {}

	@Post()
	addToFavorites(@Body() favoriteBusiness: FavoriteBusiness) {
		return this.favoriteBusinessService.addToFavorites(
			favoriteBusiness.userId,
			favoriteBusiness.businessId,
		);
	}

	@Delete()
	removeFromFavorites(@Body() favoriteBusiness: FavoriteBusiness) {
		return this.favoriteBusinessService.removeFromFavorites(
			favoriteBusiness.userId,
			favoriteBusiness.businessId,
		);
	}

	@UseGuards(JwtAuthGuard)
	@Get(':id')
	async findOne(@Param('id') userId: string) {
		return this.favoriteBusinessService.getFavoriteBusinesses(userId);
	}
}

