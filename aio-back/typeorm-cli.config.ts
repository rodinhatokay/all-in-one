/* eslint-disable prettier/prettier */
import { DataSource } from 'typeorm';
import { Category } from './src/common/entities/category.entity';
import { SubCategory } from './src/common/entities/subCategory.entity';
import { Business } from './src/business/entities/business.entity';
import { User } from './src/users/entities/user.entity';
import { Otp } from './src/otp/entities/otp.entity';
import { AddCategories1679074427752 } from './src/migrations/AddCategories-1679074427752';
import { CreateCategoryTable1679074427751 } from './src/migrations/CreateCategoryTable-1679074427751';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST || "127.0.0.1",
  port: parseInt(process.env.DATABASE_PORT,10) || 5432,
  username:  process.env.DATABASE_USER || 'postgres',
  password: process.env.DATABASE_PASS || 'pass123',
  database:  process.env.DATABASE_DB || 'postgres',
  entities: [Business, Category, SubCategory, User, Otp],
  ssl: true || false,
  migrationsRun: true || false,
  migrations: [CreateCategoryTable1679074427751, AddCategories1679074427752],
});