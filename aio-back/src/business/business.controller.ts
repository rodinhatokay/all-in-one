import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Put,
	Query,
	UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BusinessService } from './business.service';
import { CreateBusiness } from './dto/createBusiness.dto';
import { UpdateBusiness } from './dto/updateBusiness.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('business')
@Controller('business')
@UseGuards(JwtAuthGuard)
export class BusinessController {
	constructor(private readonly businessService: BusinessService) {}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.businessService.findOne(id);
	}

	@Get()
	findAll(
		@Query('query') query?: string,
		@Query('page') page?: string,
		@Query('itemsPerPage') itemsPerPage?: string,
	) {
		const parsedPage = parseInt(page, 100) || 1;
		const parsedItemsPerPage = parseInt(itemsPerPage, 100) || 100;
		return this.businessService.findAll(query, parsedPage, parsedItemsPerPage);
	}

	@Post()
	create(@Body() createBusinessDto: CreateBusiness) {
		return this.businessService.create(createBusinessDto);
	}

	@Put(':id')
	update(@Param('id') id: string, @Body() updateBusinessDto: UpdateBusiness) {
		return this.businessService.update(id, updateBusinessDto);
	}

	// @Delete(":id")
	// delete(@Param("id") id: string) {
	// 	return this.businessService.delete(id);
	// }
}

