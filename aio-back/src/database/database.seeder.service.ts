import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegisterDto } from '../auth/dto/req/register.dto';
import { User } from '../users/entities/user.entity';
import { CreateBusiness } from '../business/dto/createBusiness.dto';
import { Business } from '../business/entities/business.entity';
import { Category } from '../category/entities/category.entity';
import { TermsOfUse } from '../terms-of-use/entities/terms-of-use.entity';
import { Language } from '../common/constants/langauges';

@Injectable()
export class DatabaseSeederService implements OnApplicationBootstrap {
	constructor(
		@InjectRepository(User)
		private readonly userRepository: Repository<User>,
		@InjectRepository(Business)
		private readonly businessRepository: Repository<Business>,
		@InjectRepository(Category)
		private readonly categoryRepository: Repository<Category>,
		@InjectRepository(TermsOfUse)
		private readonly termsOfUseRepository: Repository<TermsOfUse>,
	) {}

	async onApplicationBootstrap() {
		await Promise.all([
			this.seedCategories(),
			this.seedBusinesses(),
			this.seedUsers(),
			this.seedTermsOfUse(),
		]);
	}

	private async seedTermsOfUse() {
		const count = await this.termsOfUseRepository.count();
		if (count) return;

		console.log('RUNNING SEED TERMS FOR DB');

		await this.termsOfUseRepository.save({
			content: 'english terms',
			language: Language.ENGLISH,
		});

		await this.termsOfUseRepository.save({
			content: 'תנאי שימוש',
			language: Language.ENGLISH,
		});
	}

	private async seedBusinesses() {
		// BUILD BUSINESS

		const count = await this.businessRepository.count();
		if (count) return;

		console.log('RUNNING SEED BUSINESSES FOR DB');

		const categories = await this.categoryRepository.find();
		const businesses: CreateBusiness[] = [
			{
				name: 'Fashion Emporium(Rodin)',
				description: 'Trendy clothing store with a wide selection',
				phoneNumber: '+972524560793',
				logoPath: 'https://avatars.githubusercontent.com/u/57593612?s=96&v=4',
				address: 'Kfar Kama, abazkh 5',
				hasWhatsapp: true,
				category: categories.pop(),
				location: {
					latitude: 50,
					longitude: 20,
				},
				openingHours: [
					{ day: 'Sunday', hours: [{ start: '00:00', end: '04:00' }] },
					{ day: 'Monday', hours: [{ start: '00:00', end: '04:00' }] },
					{ day: 'Tuesday', hours: [{ start: '00:00', end: '04:00' }] },
					{ day: 'Wednesday', hours: [{ start: '00:00', end: '04:00' }] },
					{ day: 'Thursday', hours: [{ start: '00:00', end: '04:00' }] },
					{ day: 'Friday', hours: [] },
					{ day: 'Saturday', hours: [] },
				],
			},
			{
				name: 'Wellness Spa(Aslan)',
				description: 'Relaxing spa with various wellness treatments',
				phoneNumber: '+972509887021',
				logoPath: 'https://avatars.githubusercontent.com/u/57593612?s=96&v=4',
				address: 'Kfar Kama, Adiga 10',
				hasWhatsapp: false,
				category: categories.pop(),
				location: {
					latitude: 50,
					longitude: 20,
				},
				openingHours: [
					{ day: 'Sunday', hours: [{ start: '00:00', end: '04:00' }] },
					{
						day: 'Monday',
						hours: [
							{ start: '00:00', end: '04:00' },
							{ start: '08:00', end: '12:00' },
						],
					},
					{ day: 'Tuesday', hours: [{ start: '00:00', end: '04:00' }] },
					{
						day: 'Wednesday',
						hours: [
							{ start: '00:00', end: '04:00' },
							{ start: '08:00', end: '12:00' },
							{ start: '15:00', end: '17:00' },
						],
					},
					{ day: 'Thursday', hours: [{ start: '00:00', end: '04:00' }] },
					{ day: 'Friday', hours: [] },
					{ day: 'Saturday', hours: [] },
				],
			},
		];

		await this.businessRepository.save(businesses);
	}

	private async seedUsers() {
		const count = await this.userRepository.count();
		if (count) return;
		// No users in the database, let's seed!

		console.log('RUNNING SEED USER FOR DB');

		// TODO: create folder for seeding seperate of concerens
		const user1: RegisterDto = {
			firstName: 'Rodin',
			lastName: 'Hatokay',
			termsAccepted: true,
			phoneNumber: '+972524560793',
		};

		const user2: RegisterDto = {
			firstName: 'Aslan',
			lastName: 'Shapso',
			termsAccepted: true,
			phoneNumber: '+972509887021',
		};

		await this.userRepository.save(user1);
		await this.userRepository.save(user2);
	}

	private async seedCategories() {
		const count = await this.categoryRepository.count();
		if (count) return;
		// No categories in the database, let's seed!

		console.log('RUNNING SEED CATEGORY FOR DB');

		// TODO: create folder for seeding seperate of concerens
		const categories = [
			{
				name: 'Retails',
			},
			{
				name: 'Cosmetics',
			},
			{
				name: 'Technicals',
			},
			{
				name: 'Motor',
			},
			{
				name: 'Food',
			},
			{
				name: 'Health',
			},
			{
				name: 'Goverment',
			},
			{
				name: 'Hang outs',
			},
		];

		await this.categoryRepository.save(categories);
	}
}
