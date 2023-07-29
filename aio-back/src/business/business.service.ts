import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Business } from './entities/business.entity';
import { CreateBusiness } from './dto/createBusiness.dto';
import { ErrorMessages } from '../common/errors/errorMessage';
import { UpdateBusiness } from './dto/updateBusiness.dto';
import { Cache } from 'cache-manager';

@Injectable()
export class BusinessService {
	readonly TTL = 60 * 60 * 100;
	constructor(
		@InjectRepository(Business)
		private readonly businessRepository: Repository<Business>,
		@Inject(CACHE_MANAGER) private cacheManager: Cache,
	) {}

	async findOne(id: string) {
		const cacheKey = `business:${id}`;
		let business: Business = await this.cacheManager.get<Business>(cacheKey);

		if (!business) {
			business = await this.businessRepository.findOne({
				where: { id },
				relations: ['category'],
			});
			await this.cacheManager.set(cacheKey, business, this.TTL);
		}

		return business;
	}

	async findAll(query?: string, page = 1, itemsPerPage = 100) {
		const cacheKey = 'businesses';
		let businesses: Business[] = await this.cacheManager.get<Business[]>(
			cacheKey,
		);

		if (!businesses) {
			businesses = await this.businessRepository.find({
				relations: ['category'],
			});
			await this.cacheManager.set(cacheKey, businesses, this.TTL);
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
		const businesses: Business[] = await this.cacheManager.get<Business[]>(
			'businesses',
		);

		businesses.push(business);
		await this.cacheManager.set('businesses', businesses, this.TTL);
	}

	async update(id: string, updateBusiness: UpdateBusiness) {
		const existingBusiness = await this.businessRepository.findOne({
			where: { id },
		});

		if (!existingBusiness)
			throw new BadRequestException(ErrorMessages.BusinessNotFound);

		const updatedBusiness = Object.assign(existingBusiness, updateBusiness);
		await this.businessRepository.save(updatedBusiness);
		await this.cacheManager.del(`business:${id}`); // Invalidate the cache for the specific business

		const businesses: Business[] = await this.cacheManager.get<Business[]>(
			'businesses',
		);
		businesses.push(updatedBusiness);

		await this.cacheManager.set('businesses', businesses, this.TTL);
		return updatedBusiness;
	}

	async delete(id: string) {
		await this.cacheManager.del(`business:${id}`); // Invalidate the cache for the specific business
		return await this.businessRepository.delete(id);
	}
}

