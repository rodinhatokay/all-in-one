import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BusinessService } from "./business.service";
import { BusinessController } from "./business.controller";
import { Business } from "./entities/business.entity";
import { Location } from "./entities/location.entity";
import { OpeningHours } from "../common/entities/openingHours.entity";

@Module({
	imports: [TypeOrmModule.forFeature([Business, Location, OpeningHours])],
	providers: [BusinessService],
	exports: [BusinessService],
	controllers: [BusinessController],
})
export class BusinessModule {}

