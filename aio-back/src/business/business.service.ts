import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Business } from './entities/business.entity';
import { CreateBusiness } from './dto/createBusiness.dto';
import { ErrorMessages } from '../common/errors/errorMessage';
import { UpdateBusiness } from './dto/updateBusiness.dto';
import { CacheService } from '../cache/cache.service';
import { BUSINESSES_CACHE_KEY } from '../common/constants/cache-keys';

@Injectable()
export class BusinessService {
	constructor(
		@InjectRepository(Business)
		private readonly businessRepository: Repository<Business>,
		private cacheService: CacheService,
	) {}

	async findOne(id: string) {
		const cacheKey = `business:${id}`;
		let business: Business = await this.cacheService.get<Business>(cacheKey);

		if (!business) {
			business = await this.businessRepository.findOne({
				where: { id },
				relations: ['category'],
			});
			await this.cacheService.set(cacheKey, business);
		}

		return business;
	}

	async findAll(query?: string, page = 1, itemsPerPage = 100) {
		let businesses: Business[] = await this.cacheService.get<Business[]>(
			BUSINESSES_CACHE_KEY,
		);

		if (!businesses) {
			businesses = await this.businessRepository.find({
				relations: ['category'],
			});
			await this.cacheService.set(BUSINESSES_CACHE_KEY, businesses);
		}

		const paginatedBusinesses = query
			? this.filterBusinesses(businesses, query)
			: businesses;

		// Calculate the start index and end index for pagination
		const startIndex = (page - 1) * itemsPerPage;
		const endIndex = page * itemsPerPage;

		return paginatedBusinesses.slice(startIndex, endIndex);
	}

	private filterBusinesses(businesses: Business[], query: string): Business[] {
		if (!businesses || businesses.length === 0) {
			return []; // Return an empty array if businesses is null or empty
		}

		return businesses.filter((business) =>
			business.name.toLowerCase().includes(query.toLowerCase()),
		);
	}

	async create(createBusiness: CreateBusiness) {
		const existingBusiness = await this.businessRepository.findOne({
			where: { phoneNumber: createBusiness.phoneNumber },
		});

		if (existingBusiness)
			throw new BadRequestException(ErrorMessages.BusinessAlreadyExists);

		const businessToAdd = this.businessRepository.create(createBusiness);

		const business = await this.businessRepository.save(businessToAdd);
		const businesses: Business[] = await this.cacheService.get<Business[]>(
			BUSINESSES_CACHE_KEY,
		);

		businesses.push(business);
		await this.cacheService.set(BUSINESSES_CACHE_KEY, businesses);
		return business;
	}

	async update(id: string, updateBusiness: UpdateBusiness) {
		const existingBusiness = await this.businessRepository.findOne({
			where: { id },
		});

		if (!existingBusiness)
			throw new BadRequestException(ErrorMessages.BusinessNotFound);

		const updatedBusiness = Object.assign(existingBusiness, updateBusiness);
		await this.businessRepository.save(updatedBusiness);
		await this.cacheService.del(`business:${id}`); 

		const businesses: Business[] = await this.cacheService.get<Business[]>(
			BUSINESSES_CACHE_KEY,
		);
		businesses.push(updatedBusiness);

		await this.cacheService.set(BUSINESSES_CACHE_KEY, businesses);
		return updatedBusiness;
	}

	async delete(id: string) {
		await this.cacheService.del(`business:${id}`); 
		return await this.businessRepository.delete(id);
	}
}

