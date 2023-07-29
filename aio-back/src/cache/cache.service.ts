
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class CacheService {
	readonly TTL = 60 * 60 * 100;
	constructor(
		@Inject(CACHE_MANAGER) private cacheManager: Cache,
	) {}

	async set(cacheKey: string, value: unknown) {
		return this.cacheManager.set(cacheKey, value, this.TTL);
	}

    async get<T>(cacheKey: string) {
		return this.cacheManager.get<T>(cacheKey);
	}

    async del(cacheKey: string) { 
        return  this.cacheManager.del(cacheKey); 
    }
}
