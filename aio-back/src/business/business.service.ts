import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Business } from './entities/business.entity';
import { CreateBusiness } from './dto/createBusiness.dto';
import { ErrorMessages } from '../common/errors/errorMessage';
import { UpdateBusiness } from './dto/updateBusiness.dto';
import { CacheService } from '../cache/cache.service';
import { BUSINESSES_CACHE_KEY } from '../common/constants/cache-keys';
import { OpeningHours } from '../common/entities/openingHours.entity';

@Injectable()
export class BusinessService {
	constructor(
		@InjectRepository(Business)
		private readonly businessRepository: Repository<Business>,
		@InjectRepository(OpeningHours)
		private openingHoursRepository: Repository<OpeningHours>,
		private readonly cacheService: CacheService,
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
			relations: ['openingHours', 'users'],
		});

		if (!existingBusiness)
			throw new BadRequestException(ErrorMessages.BusinessNotFound);

		const updatedOpeningHours = updateBusiness.openingHours.map((entry) => ({
			day: entry.day,
			hours: entry.hours,
		}));

		// Update the properties of the existing business with the new values
		Object.assign(existingBusiness, updateBusiness, {
			openingHours: updatedOpeningHours,
		});


		await this.businessRepository.save(existingBusiness);

		const businesses: Business[] = await this.cacheService.get<Business[]>(
			BUSINESSES_CACHE_KEY,
		);

		// Find the index of the existing business in the cached list
		const index = businesses.findIndex((business) => business.id === id);
		if (index !== -1) {
			// Replace the old version with the updated business in the cached list
			businesses[index] = existingBusiness;

			// Update the cached list of businesses
			await this.cacheService.set(BUSINESSES_CACHE_KEY, businesses);
		}

		return existingBusiness;
	}

	async delete(id: string) {
		const business = await this.businessRepository.findOne({
			where: { id },
			relations: ['openingHours'],
		});

		if (!business) {
			throw new BadRequestException(ErrorMessages.BusinessNotFound);
		}

		// Delete associated opening hours
		if (business.openingHours && business.openingHours.length > 0) {
			for (const openingHour of business.openingHours) {
				await this.openingHoursRepository.remove(openingHour);
			}
		}

		// Update the cached list of businesses
		const businesses: Business[] = await this.cacheService.get<Business[]>(
			BUSINESSES_CACHE_KEY,
		);

		if (businesses) {
			// Remove the deleted business from the cached list
			const updatedBusinesses = businesses.filter((b) => b.id !== id);
			await this.cacheService.set(BUSINESSES_CACHE_KEY, updatedBusinesses);
		}

		return await this.businessRepository.remove(business);
	}
}

