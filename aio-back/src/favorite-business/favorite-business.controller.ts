import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { FavoriteBusinessService } from './favorite-business.service';
import { FavoriteBusiness } from './dto/favoriteBusiness.dto';

@ApiTags('favorite-business')
@Controller('favorite-business')
@UseGuards(JwtAuthGuard)
export class FavoriteBusinessController {
	constructor(
		private readonly favoriteBusinessService: FavoriteBusinessService,
	) {}

	@Post('add')
	addToFavorites(@Body() favoriteBusiness: FavoriteBusiness) {
		return this.favoriteBusinessService.addToFavorites(
			favoriteBusiness.userId,
			favoriteBusiness.businessId,
		);
	}

	@Post('remove')
	removeFromFavorites(@Body() favoriteBusiness: FavoriteBusiness) {
		return this.favoriteBusinessService.removeFromFavorites(
			favoriteBusiness.userId,
			favoriteBusiness.businessId,
		);
	}

	@UseGuards(JwtAuthGuard)
	@Get(':id')
	async findOne(@Param('id') id: string) {
		return this.favoriteBusinessService.getFavoriteBusinesses(id);
	}
}

