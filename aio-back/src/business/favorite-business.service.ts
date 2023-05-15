import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Repository } from 'typeorm';
import { Business } from './entities/business.entity';

@Injectable()
export class FavoriteBusinessService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Business)
    private businessRepository: Repository<Business>,
  ) {}

  async addToFavorites(userId: string, businessId: string): Promise<void> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new Error('User not found.');
    }

    const business = await this.businessRepository.findOne({
      where: { id: businessId },
    });

    if (!business) {
      throw new Error('Business not found.');
    }

    if (!user || !business) {
      throw new Error('User or business not found.');
    }

    if (
      user.favoriteBusinesses.some(
        (favorite: { id: string }) => favorite.id === businessId,
      )
    ) {
      throw new Error('Business is already in the favorites list.');
    }

    user.favoriteBusinesses.push(business);
    await this.userRepository.save(user);
  }

  async removeFromFavorites(userId: string, businessId: string): Promise<void> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user && user.favoriteBusinesses !== null) {
      throw new Error('User not found.');
    }

    const index = user.favoriteBusinesses.findIndex(
      (favorite) => favorite.id === businessId,
    );
    if (index === -1) {
      throw new Error('Business is not in the favorites list.');
    }

    user.favoriteBusinesses.splice(index, 1);
    await this.userRepository.save(user);
  }

  async getFavoriteBusinesses(userId: string): Promise<Business[]> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new Error('User not found.');
    }

    return user.favoriteBusinesses;
  }
}
