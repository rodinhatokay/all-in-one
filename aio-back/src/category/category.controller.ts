import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CategoryService } from './category.service';
import { CreateCategory } from './dto/createCategoryDto';

@ApiTags('category')
@Controller('category')
@UseGuards(JwtAuthGuard)
export class CategoryController {
	constructor(private readonly categoryService: CategoryService) {}

	@Get()
	findAll() {
		return this.categoryService.findAll();
	}

	@Post()
	async create(@Body() createCategoryDto: CreateCategory) {
		return await this.categoryService.create(createCategoryDto);
	}
}
