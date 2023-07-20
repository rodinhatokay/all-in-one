import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Business } from './entities/business.entity';
import { CreateBusiness } from './dto/createBusiness.dto';
import { ErrorMessages } from '../common/errors/errorMessage';
import { UpdateBusiness } from './dto/updateBusiness.dto';

@Injectable()
export class BusinessService {
	constructor(
		@InjectRepository(Business)
		private readonly businessRepository: Repository<Business>,
	) {}

	findOne(id: string) {
		return this.businessRepository.findOne({
			where: { id },
			relations: ['category'],
		});
	}

	findAll(query?: string) {
		return this.businessRepository.find({
			where: query
				? {
						name: Like(`%${query}%`),
				  }
				: {},
			relations: ['category'],
		});
	}

	// async findBusinessesWithCategoryNames(): Promise<Business[]> {
	// 	return this.businessRepository
	// 		.createQueryBuilder('business')
	// 		.leftJoinAndSelect('business.category', 'category')
	// 		.select(['business', 'category.name'])
	// 		.getMany();
	// }

	async create(createBusiness: CreateBusiness) {
		const existingBusiness = await this.businessRepository.findOne({
			where: { phoneNumber: createBusiness.phoneNumber },
		});

		if (existingBusiness)
			throw new BadRequestException(ErrorMessages.BusinessAlreadyExists);

		const business = this.businessRepository.create(createBusiness);
		return await this.businessRepository.save(business);
	}

	async update(id: string, updateBusiness: UpdateBusiness) {
		const existingBusiness = await this.businessRepository.findOne({
			where: { id },
		});

		if (!existingBusiness)
			throw new BadRequestException(ErrorMessages.BusinessAlreadyExists);

		return await this.businessRepository.save(updateBusiness);
	}

	async delete(id: string) {
		return await this.businessRepository.delete(id);
	}
}
