import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Category } from "./entities/category.entity";
import { JwtService } from "@nestjs/jwt";
import { CategoryService } from "./category.service";
import { CategoryController } from "./category.controller";

@Module({
	imports: [TypeOrmModule.forFeature([Category])],
	providers: [CategoryService, JwtService],
	exports: [CategoryService, TypeOrmModule.forFeature([Category])],
	controllers: [CategoryController],
})
export class CategoryModule {}