import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { FavoriteBusinessService } from './favorite-business.service';
import { User } from '../users/entities/user.entity';
import { Business } from '../business/entities/business.entity';

describe('FavoriteBusinessService', () => {
  let favoriteBusinessService: FavoriteBusinessService;
  let userRepository: any;
  let businessRepository: any;

  const mockUserRepository = {
    findOne: jest.fn(),
    save: jest.fn(),
  };

  const mockBusinessRepository = {
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        FavoriteBusinessService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
        {
          provide: getRepositoryToken(Business),
          useValue: mockBusinessRepository,
        },
      ],
    }).compile();

    favoriteBusinessService = moduleRef.get<FavoriteBusinessService>(
      FavoriteBusinessService,
    );
    userRepository = moduleRef.get(getRepositoryToken(User));
    businessRepository = moduleRef.get(getRepositoryToken(Business));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('addToFavorites', () => {
    it('should add a business to user favorites', async () => {
      const user = new User();
      user.id = '1';
      const business = new Business();
      business.id = '1';

      userRepository.findOne.mockResolvedValue(user);
      businessRepository.findOne.mockResolvedValue(business);

      await favoriteBusinessService.addToFavorites('1', '1');

      expect(user.favoriteBusinesses).toContain(business);
      expect(userRepository.findOne).toHaveBeenCalledWith({
        where: { id: '1' },
      });
      expect(businessRepository.findOne).toHaveBeenCalledWith({
        where: { id: '1' },
      });
      expect(userRepository.save).toHaveBeenCalledWith(user);
    });

    it('should throw an error if user is not found', async () => {
      userRepository.findOne.mockResolvedValue(null);

      await expect(
        favoriteBusinessService.addToFavorites('1', '1'),
      ).rejects.toThrow('User not found.');
      expect(userRepository.findOne).toHaveBeenCalledWith({
        where: { id: '1' },
      });
      expect(businessRepository.findOne).not.toHaveBeenCalled();
      expect(userRepository.save).not.toHaveBeenCalled();
    });

    it('should throw an error if business is not found', async () => {
      const user = new User();
      user.id = '1';

      userRepository.findOne.mockResolvedValue(user);
      businessRepository.findOne.mockResolvedValue(null);

      await expect(
        favoriteBusinessService.addToFavorites('1', '1'),
      ).rejects.toThrow('Business not found.');

      expect(userRepository.findOne).toHaveBeenCalledWith({
        where: { id: '1' },
      });

      expect(businessRepository.findOne).toHaveBeenCalledWith({
        where: { id: '1' },
      });

      expect(userRepository.save).not.toHaveBeenCalled();
    });

    it('should throw an error if business is already in favorites list', async () => {
      const user = new User();
      user.id = '1';
      const business = new Business();
      business.id = '1';
      user.favoriteBusinesses = [business];

      userRepository.findOne.mockResolvedValue(user);
      businessRepository.findOne.mockResolvedValue(business);

      await expect(
        favoriteBusinessService.addToFavorites('1', '1'),
      ).rejects.toThrow('Business is already in the favorites list.');
      expect(userRepository.findOne).toHaveBeenCalledWith({
        where: { id: '1' },
      });
      expect(businessRepository.findOne).toHaveBeenCalledWith({
        where: { id: '1' },
      });
      expect(userRepository.save).not.toHaveBeenCalled();
    });
  });

  describe('removeFromFavorites', () => {
    it('should remove a business from user favorites', async () => {
      const user = new User();
      user.id = '1';
      const business = new Business();
      business.id = '1';
      user.favoriteBusinesses = [business];
      userRepository.findOne.mockResolvedValue(user);

      await favoriteBusinessService.removeFromFavorites('1', '1');

      expect(user.favoriteBusinesses).not.toContain(business);
      expect(userRepository.findOne).toHaveBeenCalledWith({
        where: { id: '1' },
      });
      expect(userRepository.save).toHaveBeenCalledWith(user);
    });

    it('should throw an error if user is not found', async () => {
      userRepository.findOne.mockResolvedValue(null);

      const value = await favoriteBusinessService.removeFromFavorites('1', '1');
      await expect(value).rejects.toThrow('User not found.');
      expect(userRepository.findOne).toHaveBeenCalledWith({
        where: { id: '1' },
      });
      expect(userRepository.save).not.toHaveBeenCalled();
    });

    it('should throw an error if business is not in favorites list', async () => {
      const user = new User();
      user.id = '1';

      userRepository.findOne.mockResolvedValue(user);

      await expect(
        favoriteBusinessService.removeFromFavorites('1', '1'),
      ).rejects.toThrow('Business is not in the favorites list.');
      expect(userRepository.findOne).toHaveBeenCalledWith({
        where: { id: '1' },
      });
      expect(userRepository.save).not.toHaveBeenCalled();
    });
  });
});
