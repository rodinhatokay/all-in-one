import { IsString } from 'class-validator';

export class CreateBusiness {
	@IsString()
	name: string;

	@IsString()
	phoneNumber: string;

	@IsString()
	categoryName: string;
}
