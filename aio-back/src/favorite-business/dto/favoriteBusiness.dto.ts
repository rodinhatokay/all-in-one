import { IsString } from 'class-validator';

export class FavoriteBusiness {
	@IsString()
	userId: string;

	@IsString()
	businessId: string;
}

