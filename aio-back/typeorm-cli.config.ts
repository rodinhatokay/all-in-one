/* eslint-disable prettier/prettier */
import { DataSource } from 'typeorm';
import { CreateCategoryTable1679074427751 } from './src/migrations/CreateCategoryTable-1679074427751';
import { Category } from './src/common/entities/category.entity';
import { AddCategories1679074427752 } from './src/migrations/AddCategories-1679074427752';
import { SubCategory } from './src/common/entities/subCategory.entity';
import { Business } from './src/business/entities/business.entity';
import { User } from './src/users/entities/user.entity';
import { Otp } from './src/otp/entities/otp.entity';

export default new DataSource({
  type: 'postgres',
  host: '127.0.0.1',
  port: 5432,
  username: 'postgres',
  password: 'pass123',
  database: 'postgres',
  entities: [Business, Category, SubCategory, User, Otp],
  migrations: [CreateCategoryTable1679074427751, AddCategories1679074427752],
});
