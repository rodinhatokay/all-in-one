import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Repository } from 'typeorm';
import { Business } from '../business/entities/business.entity';
import { CacheService } from '../cache/cache.service';
import { ErrorMessages } from '../common/errors/errorMessage';
import { BUSINESSES_CACHE_KEY } from '../common/constants/cache-keys';

@Injectable()
export class FavoriteBusinessService {
	constructor(
		@InjectRepository(User)
		private userRepository: Repository<User>,
		private cacheService: CacheService,
	) {}

	async addToFavorites(userId: string, businessId: string): Promise<void> {
		const user = await this.userRepository.findOne({
			where: { id: userId },
			relations: ['favoriteBusinesses'],
		});
		if (!user) {
			throw new Error(ErrorMessages.UserNotFound);
		}

		const businesses = await this.cacheService.get<Business[]>(
			BUSINESSES_CACHE_KEY,
		);

		const business: Business = businesses.find((b) => b.id === businessId);

		if (!business) {
			throw new Error(ErrorMessages.BusinessNotFound);
		}

		if (!user || !business) {
			throw new Error(ErrorMessages.UserOrBusinessNotFound);
		}

		if (user.favoriteBusinesses === undefined) user.favoriteBusinesses = [];
		if (
			user.favoriteBusinesses &&
			user.favoriteBusinesses.some((favorite) => favorite.id === businessId)
		) {
			throw new Error(ErrorMessages.BusinessAlreadyInFavorite);
		}

		user.favoriteBusinesses.push(business);

		// business.users.push(user);

		// await this.businessRepository.save(business);
		await this.userRepository.save(user);

		await this.cacheService.set(
			`user:${userId}:favorites`,
			user.favoriteBusinesses,
		);
	}

	async removeFromFavorites(userId: string, businessId: string): Promise<void> {
		const user = await this.userRepository.findOne({
			where: { id: userId },
			relations: ['favoriteBusinesses'],
		});

		if (!user && user.favoriteBusinesses !== null) {
			throw new Error(ErrorMessages.UserNotFound);
		}

		const index = user.favoriteBusinesses.findIndex(
			(favorite) => favorite.id === businessId,
		);
		if (index === -1) {
			throw new Error(ErrorMessages.BusinessIsNotInFavorite);
		}

		user.favoriteBusinesses.splice(index, 1);
		await this.userRepository.save(user);
		await this.cacheService.set(
			`user:${userId}:favorites`,
			user.favoriteBusinesses,
		);
	}

	async getFavoriteBusinesses(userId: string): Promise<Business[]> {
		try {
			const cachedBusinesses = await this.cacheService.get<Business[]>(
				`user:${userId}:favorites`,
			);

			if (cachedBusinesses) {
				return cachedBusinesses;
			}

			const user = await this.userRepository
				.createQueryBuilder('user')
				.leftJoinAndSelect('user.favoriteBusinesses', 'business')
				.where('user.id = :userId', { userId: userId })
				.getOne();

			if (user && user.favoriteBusinesses) {
				await this.cacheService.set(
					`user:${userId}:favorites`,
					user.favoriteBusinesses,
				);
				return user.favoriteBusinesses;
			} else {
				return [];
			}
		} catch (error) {
			console.error('Error fetching favorite businesses:', error);
			throw error;
		}
	}
}

