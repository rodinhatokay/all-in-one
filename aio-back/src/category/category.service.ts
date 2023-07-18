import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { CreateCategory } from './dto/createCategoryDto';
import { ErrorMessages } from '../common/errors/errorMessage';

@Injectable()
export class CategoryService {
	constructor(
		@InjectRepository(Category)
		private readonly categoryRepository: Repository<Category>,
	) {}

	findAll(query?: string) {
		return this.categoryRepository.find(
			query
				? {
						where: {
							name: query,
						},
				  }
				: undefined,
		);
	}

	async create(createCategoryDto: CreateCategory) {
		const existingCategory = await this.categoryRepository.findOne({
			where: { name: createCategoryDto.name },
		});

		if (existingCategory) {
			throw new BadRequestException(ErrorMessages.CategoryAlreadyExistByName);
		}

		const category = await this.categoryRepository.save(createCategoryDto);
		return category;
	}
}
