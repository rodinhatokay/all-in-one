import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BusinessService } from './business.service';
import { BusinessController } from './business.controller';
import { Business } from './entities/business.entity';
import { Category } from '../common/entities/category.entity';
import { SubCategory } from '../common/entities/subCategory.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Business, Category, SubCategory])],
  providers: [BusinessService],
  exports: [BusinessService],
  controllers: [BusinessController],
})
export class BusinessModule {}
