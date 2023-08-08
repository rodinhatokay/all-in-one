import {
	Body,
	Controller,
	Get,
	Post,
	Delete,
	UseGuards,
	Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { FavoriteBusinessService } from './favorite-business.service';
import { User } from '../common/decorators/user.decorator';
import { JwtPayload } from '../auth/types/jwt';
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
	removeFromFavorites(
		@Query('businessId') businessId: string,
		@User() user: JwtPayload,
	) {
		return this.favoriteBusinessService.removeFromFavorites(
			user.userId,
			businessId,
		);
	}

	@Get()
	async findBusinessesByUserId(@User() user: JwtPayload) {
		return this.favoriteBusinessService.getFavoriteBusinesses(user.userId);
	}
}
