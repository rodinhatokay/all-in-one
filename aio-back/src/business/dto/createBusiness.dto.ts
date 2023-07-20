import {
	IsString,
	IsBoolean,
	IsArray,
	ArrayMinSize,
	ArrayMaxSize,
	IsNotEmpty,
} from "class-validator";
import { Location } from "../../common/dto/location.dto";
import { OpeningHours } from "../../common/dto/opening-hours.dto";
import { Category } from "../../common/dto/category.dto";

export class CreateBusiness {
	@IsString()
	name: string;

	@IsString()
	phoneNumber: string;

	@IsString()
	logoPath: string;

	@IsString()
	address: string;

	@IsBoolean()
	hasWhatsapp: boolean;

	@IsString()
	description: string;

	@IsNotEmpty({ message: "category is required" })
	category: Category;

	@IsNotEmpty({ message: "location is required" })
	location: Location;

	@IsArray()
	@ArrayMinSize(7, { message: "Array must contain exactly 7 elements" })
	@ArrayMaxSize(7, { message: "Array must contain exactly 7 elements" })
	openingHours: OpeningHours[];	
}
