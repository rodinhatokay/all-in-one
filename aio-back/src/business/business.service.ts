import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Business } from './entities/business.entity';
import { CreateBusiness } from './dto/createBusiness.dto';
import { ErrorMessages } from '../common/errors/errorMessage';
import { UpdateBusiness } from './dto/updateBusiness.dto';
import { Category } from '../common/entities/category.entity';

@Injectable()
export class BusinessService {
  constructor(
    @InjectRepository(Business)
    private readonly businessRepository: Repository<Business>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  findOne(id: string) {
    return this.businessRepository.findOne({
      where: { id },
    });
  }

  findAll() {
    return this.businessRepository.find();
  }

  async findBusinessesWithCategoryNames(): Promise<Business[]> {
    return this.businessRepository
      .createQueryBuilder('business')
      .leftJoinAndSelect('business.category', 'category')
      .select(['business', 'category.name'])
      .getMany();
  }

  async create(createBusiness: CreateBusiness) {
    const existingBusiness = await this.businessRepository.findOne({
      where: { phoneNumber: createBusiness.phoneNumber },
    });

    if (existingBusiness)
      throw new BadRequestException(ErrorMessages.BusinessAlreadyExists);

    const category = await this.categoryRepository.findOne({
      where: { name: createBusiness.categoryName },
    });

    // create user and save
    const user = this.businessRepository.create({
      name: createBusiness.name,
      phoneNumber: createBusiness.phoneNumber,
      categoryId: category.id,
    });

    return await this.businessRepository.save(user);
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
