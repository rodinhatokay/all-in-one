import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Category } from "./entities/category.entity";

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
}

